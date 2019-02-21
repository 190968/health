import RadiologyPure from '../components/Radiology';
import { compose, withHandlers } from 'recompose';
import { enhanceHealthRecordManagerStart, enhanceHealthRecordManagerEnd } from '../enhances';
import moment from 'moment';
import { prepareTreatmentElementObjectInput } from '../components/Treatment/containers/ElementManager';
 
const enhance = compose(
    enhanceHealthRecordManagerStart,
    withHandlers({
        onSubmit: props => (values) => {

            // validate fields
            props.form.validateFields((err, values) => {
                if (!err) {
                    let radiology = prepareRadiologyInput(values);
                    const {type} = props;
                    radiology = prepareTreatmentElementObjectInput({type, radiology});
                    props.onHealthItemSubmit({radiology});
                }
            });
        }
    }),
    enhanceHealthRecordManagerEnd
)
export const RadiologyForm = enhance(RadiologyPure);
export const RadiologyPureForm = RadiologyPure;



export const prepareRadiologyInput = values => {
    const {
        date,
        ...otherProps
    } = values;

    return {
        date:moment(date).format('YYYY-MM-DD'),
        ...otherProps
    }
}