import OncologyPure from '../components/Oncology';
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
                    let oncology = prepareOncologyInput(values);
                    const {type} = props;
                    oncology = prepareTreatmentElementObjectInput({type, oncology});
                    props.onHealthItemSubmit({oncology});
                }
            });
        }
    }),
    enhanceHealthRecordManagerEnd
)
export const OncologyForm = enhance(OncologyPure);
export const OncologyPureForm = OncologyPure;



export const prepareOncologyInput = values => {
    const {
        date,
        ...otherProps
    } = values;

    return {
            date:moment(date).format('YYYY-MM-DD'),
            ...otherProps
    }
}