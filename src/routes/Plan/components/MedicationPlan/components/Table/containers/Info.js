import Info from '../components/Info';
import {compose, withHandlers} from 'recompose';
import { enhanceMedicationReport } from '../../../containers/MedicationTakeButton';
import { withToggleModal } from '../../../../../../../components/Modal';

const enhance = compose(
    // enhanceMedicationReport
    // withHandlers()
);

export const MedicationInfo = withToggleModal (Info);