import { compose,  withProps } from 'recompose';
import { RemindersManagerByTime } from '../../../../../../../../../components/Reminders/containers/RemindersManagerByTime';

const enhance = compose(
	withProps((props) => {
		const { medication } = props;
		const { drug,timesPerHour } = medication || {};
		const {name} = drug;

		const times = timesPerHour.map((timePerHour, i) => {
			const { time } = timePerHour;
			return time;
		});

		return { modalTitle: name+' Reminders', times, reminderInfo: {type: 'medication', id: medication.id}};
	}),
);
export const MedicationReminderManager = enhance(RemindersManagerByTime);
