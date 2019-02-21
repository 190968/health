import { compose, withHandlers} from 'recompose';
import {ClinicalTrialForm, prepareClinicalTrialInput}  from '../../../../../../../../../../Health/components/Forms/containers/ClinicalTrial';
import {withTreatmentItemModal} from '../modal';

const enhance = compose(
    withHandlers({
        onSubmit: props => () => {
            const {form} = props;
            form.validateFields((err, values) => {
                if (!err) {
                    const input = prepareClinicalTrialInput(values);
                    props.onSubmit(input)
                }
            });
        },
    }),
    withTreatmentItemModal
)
const TreatmentClinicalTrialEditor = enhance(ClinicalTrialForm);
export default TreatmentClinicalTrialEditor;