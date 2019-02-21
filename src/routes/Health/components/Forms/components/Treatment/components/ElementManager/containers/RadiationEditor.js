import { compose, withHandlers , withProps} from 'recompose';
import {RadiationPureForm, prepareRadiationInput} from '../../../../../containers/Radiation';
import { withTreatmentFormElementStart, withTreatmentFormElementEnd } from '../enhancers';

const enhance = compose(
    withTreatmentFormElementStart,
    withHandlers({
        onSubmit: props => () => {
            const {form} = props;
            form.validateFields((err, values) => {
                if (!err) {
                    const element = prepareRadiationInput(values);
                    props.onSubmit(element)
                }
            });
        },
    }),
    withTreatmentFormElementEnd
    //withTreatmentFormElement
)
const Enhanced = enhance(RadiationPureForm);
export default Enhanced;