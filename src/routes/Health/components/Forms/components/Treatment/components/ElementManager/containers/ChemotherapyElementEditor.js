import { compose, branch, renderComponent, withHandlers , withProps, withState} from 'recompose';
import { ChemotherapyPureForm, prepareChemotherapyInput } from '../../../../../containers/Chemotherapy';
import { withTreatmentFormElementStart, withTreatmentFormElementEnd } from '../enhancers';
// import { withTreatmentFormElement } from '../../../containers/ElementManager';




const enhance = compose(
    withTreatmentFormElementStart,
    withHandlers({
        onSubmit: props => () => {
            const {form} = props;
            form.validateFields((err, values) => {
                if (!err) {
                    //const input = prepareChemotherapyInput(values);
                    let element = prepareChemotherapyInput(values);
                    props.onSubmit(element);

                    //console.log(input);
                    //props.onSubmit(input)
                }
            });
        },
    }),
    withTreatmentFormElementEnd
)

const TreatmentChemotherapyElementEditor = enhance(ChemotherapyPureForm)
export default TreatmentChemotherapyElementEditor;


