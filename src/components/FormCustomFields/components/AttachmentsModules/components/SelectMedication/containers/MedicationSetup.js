import {compose} from 'recompose';
// import { enhanceMedicationManagerActions } from '../../../../../../../routes/Plan/components/MedicationPlan/components/Medication/containers/MedicationManager';
import { MedicationManagerFormFields } from '../../../../../../../routes/Plan/components/MedicationPlan/components/Medication/components/MedicationManager';
import {withState, withHandlers} from 'recompose';
import { enhanceMedicationManagerActions } from '../../../../../../../routes/Plan/components/MedicationPlan/components/Medication/components/enhancers';

//  const enhanceMedicationManagerActions = compose(
// 	withState('timesAtHours', 'setTimesAtHours', (props) => {
// 		const { medication } = props;
// 		const { timesPerHour = [] } = medication || {};
// 		return timesPerHour.length;
// 	}),
// 	withState('showAdvance', 'setShowAdvance', false),
// 	withHandlers({
// 		toggleAdvanced: (props) => () => {
// 			props.setShowAdvance(!props.showAdvance);
// 		},
// 		onSelectTimes: (props) => (value) => {
// 			props.setTimesAtHours(value);
// 		},
// 		onTotal: (props) => () => {}
// 	})
// );

export const TaskManagerAttachmentMedicationSetup = enhanceMedicationManagerActions(MedicationManagerFormFields);