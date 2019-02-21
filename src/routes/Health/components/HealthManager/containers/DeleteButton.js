import DeleteButtonPure from '../components/DeleteButton';
import {message} from 'antd';
import { compose, withHandlers } from 'recompose';
import { withDeleteItemMutation } from '../../../mutations';

const enhance = compose(
	withDeleteItemMutation,
	withHandlers({
		handleDelete: (props) => () => {
			const {deleteHealthRecord, healthRecord } = props;
			//if (id) {
				const hide = message.loading('Deleting...');
				deleteHealthRecord().then(() => {
					hide();
					message.success('Deleted');
					if (props.onDelete) {
						// it runs only refetch of healthitems.
						props.onDelete();
					}
				});
			//} else {
                // if (props.onDelete) {
				// 	props.onDelete(reminder);
				// }
			//}
		}
	})
);
export const HealthDeleteButton = enhance(DeleteButtonPure);
