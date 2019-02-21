import Assign from './Assign';
import { compose, withState, withHandlers, withProps } from 'recompose';
import { withModal } from '../../../../../../../components/Modal';
import { Form, message } from 'antd';
import { withForwardTaskMutation } from '../../../mutations';
const createFormField = Form.createFormField;

const enhance = compose(
    Form.create({
        mapPropsToFields(props) {
            console.log(props);
            const { task } = props;

            if (!task) {
                return;
            }

            const { participants = [] } = task || {};
            let values = {};
            // values.staffMembers = createFormField({
            //         value: participants,
            //     });
            values.teamMembersMode = createFormField({
                    value: 2,
            });
            values.providerId = createFormField({
                    value: 1,
            });
            return values;
            // {
            //     ,
            //     providerId: createFormField({
            //         value: providerId,
            //     }),
            //     teamMembersMode: createFormField({
            //         value: source,
            //     }),
            //     title: createFormField({
            //         value: title,
            //     }),
            //     description: createFormField({
            //         value: description,
            //     }),
            //     priority: createFormField({
            //         value: priority,
            //     }),
            //     endDate: createFormField({
            //         value: endDate ? moment(endDate) : undefined,
            //     }),
            // };
        }
    }),
    withForwardTaskMutation,
    withState('assignMode', 'setAssignMode'),
    withHandlers({
        onSubmit: props => () => {
            const { form } = props;
            form.validateFields((err, values) => {
                console.log(props);
                console.log(values);
                if (!err) {
                    const {assignMode} = props;
                    const input = prepareTaskAssignInput({...values, assignMode});
                    const hide = message.loading('Saving...');
                    return props.forwardTask(input).then(() => {
                        hide();
                        if (props.onHide) {
                            props.onHide();
                        }
                        message.success('Saved');
                    });
                }
            });
        },
        onChange: props => (assignMode) => {
            props.setAssignMode(assignMode);
        }
    }),
    withProps(props => {
        const { task } = props;
        const { patient } = task || {};
        return {
            patient
        }
    }),
    withModal
);
export const TaskForward = enhance(Assign);


export const prepareTaskAssignInput = (value) => {
    const {assignMode:type, providerId, staffMembers:participants, familyMembers, teamMembersMode} = value;

    const {mode, users} = teamMembersMode || {};
    let recipientInput = {type,providerId, participants/*, useAll:teamMembersMode===1*/};
    if (type === 1) {
        if (mode === 2) {
            recipientInput.participants = users;
        } else {
            recipientInput.useAll = true;
        }
    } else if (type == 2) {
        recipientInput.participants = familyMembers;
    }

    return recipientInput;




    // const { assignMode: type, providerId, staffMembers: participants, teamMembersMode } = value || {};

    // const { mode, users } = teamMembersMode || {};
    // let recipientInput = { type, providerId, participants/*, useAll:teamMembersMode===1*/ };
    // if (type === 1) {
    //     if (mode === 2) {
    //         recipientInput.participants = users || [];
    //     } else {
    //         recipientInput.useAll = true;
    //     }
    // }

    // return recipientInput;
}