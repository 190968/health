import ClinicalTrialPure from '../components/ClinicalTrial';
import { compose, withHandlers } from 'recompose';
import { enhanceHealthRecordManagerStart, enhanceHealthRecordManagerEnd } from '../enhances';
import moment from 'moment';
import { prepareTreatmentElementObjectInput } from '../components/Treatment/containers/ElementManager';

const enhance = compose(
    enhanceHealthRecordManagerStart,
    withHandlers({
        onSubmit: props => () => {
            props.form.validateFields((err, values) => {
                if (!err) {
                    let clinical_trial = prepareClinicalTrialInput(values);
                    const {type} = props;
                    clinical_trial = prepareTreatmentElementObjectInput({type, clinical_trial});
                    props.onHealthItemSubmit({clinical_trial});
                }
            });
        }
    }),
    enhanceHealthRecordManagerEnd
)
export const ClinicalTrialForm = enhance(ClinicalTrialPure);
export const ClinicalTrialPureForm = ClinicalTrialPure;


export const prepareClinicalTrialInput = values => {
    const {
        date,
        ...otherProps
    } = values;

    return {
            date:moment(date).format('YYYY-MM-DD'),
            ...otherProps
    }
}