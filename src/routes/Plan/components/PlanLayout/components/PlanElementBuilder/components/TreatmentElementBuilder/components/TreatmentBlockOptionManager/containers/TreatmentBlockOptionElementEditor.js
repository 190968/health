import { compose, branch, renderComponent, withHandlers , withProps, withState} from 'recompose';
import {TreatmentBlockElementEditorPure, prepareInput} from '../components/TreatmentBlockOptionElementEditor';
import { withTreatmentItemModal } from '../modal';

const enhance = compose(
    withHandlers({
        onSubmit: props => () => {
            const {form} = props;
            form.validateFields((err, values) => {
                if (!err) {
                    const {text} = values;
                    const input = {notes: text};
                    props.onSubmit(input);
                }
            });
        },
    }),
    withTreatmentItemModal
)

const TreatmentBlockElementEditor = enhance(TreatmentBlockElementEditorPure)
export default TreatmentBlockElementEditor;