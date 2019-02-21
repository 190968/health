import { compose, branch, renderComponent, withHandlers , withProps, withState} from 'recompose';
import {TreatmentChemotherapyElementEditorPure, prepareChemotherapyInput} from '../components/TreatmentChemotherapyElementEditor';
import {withTreatmentItemModal} from '../modal';
 


const enhance = compose(
    withHandlers({
        onSubmit: props => () => {
            const {form} = props;
            form.validateFields((err, values) => {
                if (!err) {
                    const input = prepareChemotherapyInput(values);
                    props.onSubmit(input)
                }
            });
        },
    }),
    withTreatmentItemModal
)

const TreatmentChemotherapyElementEditor = enhance(TreatmentChemotherapyElementEditorPure)
export default TreatmentChemotherapyElementEditor;