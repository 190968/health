import SelectAssessment from '../components/SelectAssessment';
import {Form} from 'antd';
import { compose, withProps, branch, renderComponent, withState, withHandlers } from 'recompose';
import { withDrawer } from '../../../../Modal';

const enhance = compose(
    Form.create(),
    withProps(props => {
        return {modalTitle: 'Select Assessment'}
    }),
    withHandlers({
        onSubmit: props => () => { 
            const {form} = props;
            form.validateFields((err, values) => {
                if (!err) {
                    const {assessment, ...otherValues} = values;
                    props.addAttachment({...assessment, schedule:otherValues});
                }
            });
            //props.setPlan(value);
            //props.addAttachment(value);
            //props.onHide();
        }
    }),
    withDrawer,
);
export const TaskManagerAttachmentSelectAssessment = enhance(SelectAssessment);