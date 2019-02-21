import DiagnosisPure from '../components/Diagnosis';
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
                    let diagnosis = prepareDiagnosisInput(values);
                    const {type} = props;
                    diagnosis = prepareTreatmentElementObjectInput({type, diagnosis});
                    props.onHealthItemSubmit({diagnosis});
                }
            });
        }
    }),
    enhanceHealthRecordManagerEnd
)
export const DiagnosisForm = enhance(DiagnosisPure);
export const DiagnosisPureForm = DiagnosisPure;


export const prepareDiagnosisInput = values => {
    const {
        date,
        code,
        ...otherProps
    } = values;
    const {id:codeId} = code || {};
    return {
            date:moment(date).format('YYYY-MM-DD'),
            codeId,
            ...otherProps
    }
}