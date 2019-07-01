import SelectMedication from '../components/SelectMedication';
import {Form} from 'antd';
import { compose, withProps, withHandlers} from 'recompose';
import { withDrawer } from '../../../../Modal';

const enhance = compose(
    Form.create(),
    withProps(() => {
        return {modalTitle: 'Select Medication'}
    }),
    withHandlers({
        onSubmit: props => () => { 
            const {form} = props;
            form.validateFields((err, values) => {
                if (!err) {
                    // const {medication, ...otherValues} = values;
                    props.addAttachment(values);
                    // props.addAttachment({...medication, setup:otherValues});
                }
            });
        }
    }),
    withDrawer
);
export const TaskManagerAttachmentSelectMedication = enhance(SelectMedication);