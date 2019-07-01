import SelectTracker from '../components/SelectTracker';
import {Form} from 'antd';
import { compose, withProps, withHandlers} from 'recompose';
import { withDrawer } from '../../../../Modal';

const enhance = compose(
    Form.create(),
    withProps(() => {
        return {modalTitle: 'Select Tracker'}
    }),
    withHandlers({
        onSubmit: props => () => { 
            const {form} = props;
            form.validateFields((err, values) => {
                //console.log(values)
                if (!err) {
                    // const {measurement, ...otherValues} = values;
                    props.addAttachment(values);
                    // props.addAttachment({...measurement, setup:otherValues});
                }
            });
        }
    }),
    withDrawer
);
export const TaskManagerAttachmentSelectTracker = enhance(SelectTracker);