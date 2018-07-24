import TreatmentPlanElementPreview from '../components/TreatmentPlanElementPreview';
import {compose, withHandlers, withProps} from 'recompose';
import {Form} from 'antd';
import { withModal } from '../../../../../../../../../../../../../components/Modal';

const enhance = compose(
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            const notes = props.form.getFieldValue('notes');
            props.onSave(notes);
        }
    }),
    withModal
);

export default enhance(TreatmentPlanElementPreview);