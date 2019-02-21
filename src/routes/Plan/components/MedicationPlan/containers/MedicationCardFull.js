import MedicationCardFullPure from '../components/MedicationCardFull';
import { withDrawer } from '../../../../../components/Modal';
import {compose, withProps} from 'recompose';
const enhance = compose(
    withProps(props => ({
        modalTitle:props.medication.drug.name,
        modalFooter:false,
        modalWidth:600
    })),
    withDrawer
);
export const MedicationCardFull = enhance(MedicationCardFullPure);