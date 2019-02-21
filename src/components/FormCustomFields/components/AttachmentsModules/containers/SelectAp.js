import SelectAp from '../components/SelectAp';
import {Form} from 'antd';
import { compose, withProps, branch, renderComponent, withState, withHandlers } from 'recompose';
import { withDrawer } from '../../../../Modal';

const enhance = compose(
    Form.create(),
    withProps(props => {
        return {modalTitle: 'Select ActionPlan'}
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
export const TaskManagerAttachmentSelectAp = enhance(SelectAp);