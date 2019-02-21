import MedicationPure from '../components/Medication';
import { compose, withHandlers } from 'recompose';
import { enhanceHealthRecordManagerStart, enhanceHealthRecordManagerEnd } from '../enhances';
import moment from 'moment';
import { prepareTreatmentElementObjectInput } from '../components/Treatment/containers/ElementManager';
 
const enhance = compose(
    enhanceHealthRecordManagerStart,
    withHandlers({
        onSubmit: props => (values) => {
            props.form.validateFields((err, values) => {
                if (!err) {
                    let medication = prepareMedicationInput(values);
                    const {type} = props;
                    medication = prepareTreatmentElementObjectInput({type, medication});
                    props.onHealthItemSubmit({medication});
                }
            });
        }
    }),
    enhanceHealthRecordManagerEnd
)
export const MedicationForm = enhance(MedicationPure);
export const MedicationPureForm = MedicationPure;


export const prepareMedicationInput = values => {
    const {
        date,
        ...otherProps
    } = values;

    return {
           // date:moment(date).format('YYYY-MM-DD'),
            ...otherProps
    }
}