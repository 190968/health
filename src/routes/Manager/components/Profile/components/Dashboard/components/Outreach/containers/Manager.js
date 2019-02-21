import Manager from '../components/Manager';
import {compose, withProps, branch, withHandlers} from 'recompose';
import {Form} from 'antd';
import { withUpdateMutationAndQuery, withCreateOutreachMutation } from '../mutations';
import { withDrawer } from '../../../../../../../../../components/Modal';



const enhance = compose(
    branch(props => props.outreach, withUpdateMutationAndQuery, withCreateOutreachMutation),
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            props.form.validateFields((err, values) => {
                //console.log(values);
                if (!err) {
                    const {onCreate, outreach} = props;
                    const {participants, ...otherValues} = values;


                    const input = {...otherValues, participants: participants.map(participant => participant.id)};
                    props.onSubmit(input).then(({data})=> {
                        props.onHide();
                        if (!outreach && onCreate) {
                            props.onCreate();
                        }
                    });
                }
            });
        },
    }),
    withProps(props => {
        const {user, outreach} = props;
        const modalTitle = outreach ? 'Edit Outreach for '+user.fullName : 'Add Outreach for '+user.fullName;
        return {
            modalTitle
        }
    }),
    withDrawer
);
export const OutreachManager = enhance(Manager);
export default OutreachManager;