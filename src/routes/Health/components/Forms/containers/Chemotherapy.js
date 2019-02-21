import ChemotherapyPure from '../components/Chemotherapy';
import { compose, withHandlers } from 'recompose';
import { enhanceHealthRecordManagerStart, enhanceHealthRecordManagerEnd } from '../enhances';
import moment from 'moment';
import { prepareTreatmentElementObjectInput } from '../components/Treatment/containers/ElementManager';
//import TreatmentChemotherapyElementEditorPure from '../../../../Plan/components/PlanLayout/components/PlanElementBuilder/components/TreatmentElementBuilder/components/TreatmentBlockOptionManager/components/TreatmentChemotherapyElementEditor';
  
const enhance = compose(
    enhanceHealthRecordManagerStart,
    withHandlers({
        onSubmit: props => (values) => {
            props.form.validateFields((err, values) => {
                if (!err) {
                    let chemotherapy = prepareChemotherapyInput(values);
                    const {type} = props;
                    chemotherapy = prepareTreatmentElementObjectInput({type, chemotherapy});
                    props.onHealthItemSubmit({chemotherapy});
                }
            });
        }
    }),
    enhanceHealthRecordManagerEnd
)
export const ChemotherapyForm = enhance(ChemotherapyPure);
export const ChemotherapyPureForm = ChemotherapyPure;



export const prepareChemotherapyInput = values => {
    const {
        date,
        ...otherProps
    } = values;

    return {
            date:moment(date).format('YYYY-MM-DD'),
            ...otherProps
    }
}