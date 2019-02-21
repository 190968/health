import RadiationPure from '../components/Radiation';
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
                    let radiation = prepareRadiationInput(values);
                    const {type} = props;
                    radiation = prepareTreatmentElementObjectInput({type, radiation});
                    props.onHealthItemSubmit({radiation});
                }
            });
        }
    }),
    enhanceHealthRecordManagerEnd
)
export const RadiationForm = enhance(RadiationPure);
export const RadiationPureForm = RadiationPure;


export const prepareRadiationInput = values => {
    const {
        date,
        ...otherProps
    } = values;

    return {
        date:moment(date).format('YYYY-MM-DD'),
        ...otherProps
    }
}