import TreatmentElementDeleteButtonPure from '../components/DeleteButton';
import { compose, withHandlers } from 'recompose';

const enhance = compose(
	// withDeleteReminderMutation,
	withHandlers({
		handleDelete: (props) => () => {
            const {treatmentElement} = props;

            props.handleDelete(treatmentElement);
			// const { reminder, deleteReminder } = props;
			// const { id } = reminder;
			// if (id) {
			// 	deleteReminder().then(() => {
			// 		if (props.onDelete) {
			// 			props.onDelete(reminder);
			// 		}
			// 	});
			// } else {
            //     if (props.onDelete) {
			// 		props.onDelete(reminder);
			// 	}
			// }
		}
	})
);
export const TreatmentElementDeleteButton = enhance(TreatmentElementDeleteButtonPure);
