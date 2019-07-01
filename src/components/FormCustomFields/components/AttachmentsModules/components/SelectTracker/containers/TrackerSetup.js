import {compose} from 'recompose';
import {withState, withHandlers} from 'recompose';
import { TrackerManagerFormFields } from '../../../../../../../routes/Plan/components/BiometricPlan/components/TrackerManager';

 const enhanceMedicationManagerActions = compose(
	withState('timesAtHours', 'setTimesAtHours', (props) => {
		const { medication } = props;
		const { timesPerHour = [] } = medication || {};
		return timesPerHour.length;
	}),
	withState('showAdvance', 'setShowAdvance', false),
	withHandlers({
		toggleAdvanced: (props) => () => {
			props.setShowAdvance(!props.showAdvance);
		},
		onSelectTimes: (props) => (value) => {
			props.setTimesAtHours(value);
		},
		onTotal: (props) => () => {}
	})
);

export const TaskManagerAttachmentTrackerSetup = enhanceMedicationManagerActions(TrackerManagerFormFields);