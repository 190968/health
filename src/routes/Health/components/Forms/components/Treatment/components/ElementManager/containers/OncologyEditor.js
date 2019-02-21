import { compose, withHandlers , withProps} from 'recompose';
import { OncologyPureForm, prepareOncologyInput }  from '../../../../../containers/Oncology';
import { withTreatmentFormElementStart, withTreatmentFormElementEnd } from '../enhancers';

const enhance = compose(
    withTreatmentFormElementStart,
    withHandlers({
        onSubmit: props => () => {
            const {form} = props;
            form.validateFields((err, values) => {
                if (!err) {
                    const element = prepareOncologyInput(values);
                    props.onSubmit(element)
                }
            });
        },
    }),
    withTreatmentFormElementEnd
    //withTreatmentFormElement
)
const Enhanced = enhance(OncologyPureForm);
export default Enhanced;