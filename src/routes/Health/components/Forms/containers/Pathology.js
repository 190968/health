import PathologyPure from '../components/Pathology';
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
                    let pathology = preparePathologyInput(values);
                    const {type} = props;
                    pathology = prepareTreatmentElementObjectInput({type, pathology});
                    props.onHealthItemSubmit({pathology});
                }
            });
        }
    }),
    enhanceHealthRecordManagerEnd
)
export const PathologyForm = enhance(PathologyPure);
export const PathologyPureForm = PathologyPure;


export const preparePathologyInput = values => {
    const {
        date,
        ...otherProps
    } = values;

    return {
            date:moment(date).format('YYYY-MM-DD'),
            ...otherProps
    }
}