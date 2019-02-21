import ReminderDeleteButtonPure from '../components/ReminderDeleteButton';
import { compose, withHandlers } from 'recompose';
import { withDeleteReminderMutation } from './mutations';

const enhance = compose(
	withDeleteReminderMutation,
	withHandlers({
		handleDelete: (props) => () => {
			const { reminder, deleteReminder } = props;
			const { id } = reminder;
			if (id) {
				deleteReminder().then(() => {
					if (props.onDelete) {
						props.onDelete(reminder);
					}
				});
			} else {
                if (props.onDelete) {
					props.onDelete(reminder);
				}
			}
		}
	})
);
export const ReminderDeleteButton = enhance(ReminderDeleteButtonPure);
