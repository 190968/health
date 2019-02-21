import { compose, withHandlers , withProps} from 'recompose';
import {PathologyPureForm, preparePathologyInput}  from '../../../../../containers/Pathology';
import { withTreatmentFormElementStart, withTreatmentFormElementEnd } from '../enhancers';

const enhance = compose(
    withTreatmentFormElementStart,
    withHandlers({
        onSubmit: props => () => {
            const {form} = props;
            form.validateFields((err, values) => {
                if (!err) {
                    const element = preparePathologyInput(values);
                    props.onSubmit(element)
                }
            });
        },
    }),
    withTreatmentFormElementEnd
    //withTreatmentFormElement
)
const Enhanced = enhance(PathologyPureForm);
export default Enhanced;