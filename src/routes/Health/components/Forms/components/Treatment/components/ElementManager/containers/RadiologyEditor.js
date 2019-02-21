import { compose, withHandlers , withProps} from 'recompose';
import { RadiologyPureForm, prepareRadiologyInput } from '../../../../../containers/Radiology';
import { withTreatmentFormElementStart, withTreatmentFormElementEnd } from '../enhancers';

const enhance = compose(
    withTreatmentFormElementStart,
    withHandlers({
        onSubmit: props => () => {
            const {form} = props;
            form.validateFields((err, values) => {
                if (!err) {
                    const element = prepareRadiologyInput(values);
                    //console.log(input);
                    props.onSubmit(element)
                }
            });
        },
    }),
    withTreatmentFormElementEnd
    //withTreatmentFormElement
)
// const Enhanced = enhance(RadiologyForm);
// export default Enhanced;
export default enhance(RadiologyPureForm);