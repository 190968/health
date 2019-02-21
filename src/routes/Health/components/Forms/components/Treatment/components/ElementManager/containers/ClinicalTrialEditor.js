import { compose, withHandlers, withProps} from 'recompose';
import { ClinicalTrialPureForm, prepareClinicalTrialInput } from '../../../../../containers/ClinicalTrial';
import { withTreatmentFormElementStart, withTreatmentFormElementEnd } from '../enhancers';

const enhance = compose(
    
    withTreatmentFormElementStart,
    withHandlers({
        onSubmit: props => () => {
            const {form} = props;
            form.validateFields((err, values) => {
                if (!err) {
                    const element = prepareClinicalTrialInput(values);
                    props.onSubmit(element)
                }
            });
        },
    }),
    withTreatmentFormElementEnd,
   // withProps(console.log)
   // withTreatmentFormElement
)
const TreatmentClinicalTrialEditor = enhance(ClinicalTrialPureForm);
export default TreatmentClinicalTrialEditor;