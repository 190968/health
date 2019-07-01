import SelectAp from '../components/SelectAp';
import { compose, withProps,  withHandlers } from 'recompose';
import { withDrawer } from '../../../../Modal';
import {Form} from 'antd';

const enhance = compose(
    Form.create(),
    withProps(props => {
        return {modalTitle: 'Select Checklist'}
    }),
    withHandlers({
        onSubmit: props => () => { 
            const {form} = props;
            form.validateFields((err, values) => {
                //console.log(values)
                if (!err) {
                    const {plan, ...otherValues} = values;
                    props.addAttachment({...plan, schedule:otherValues});
                }
            });
            //props.setPlan(value);
            //props.addAttachment(value);
            //props.onHide();
        }
    }),
    withDrawer,
);
export const TaskManagerAttachmentSelectChecklist = enhance(SelectAp);