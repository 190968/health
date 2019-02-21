import UserPlanDeleteButtonPure from '../components/UserPlanDeleteButton';
import {message} from 'antd';
import { compose, withHandlers } from 'recompose';
import { withDeleteUserPlanMutation } from '../../../mutations';
//import { withDeleteItemMutation } from '../../../mutations';

const enhance = compose(
	withDeleteUserPlanMutation,
	//withDeleteItemMutation,
	withHandlers({
		handleDelete: (props) => () => {
			// const { deleteHealthRecord } = props;
			// //if (id) {

			const hide = message.loading('Deleting...');
			props.deleteUP().then(() => {
				hide();
				message.success('Deleted');
				if (props.refetch) {
					props.refetch();
				}
			});
			// 	deleteHealthRecord().then(() => {
			// 		// if (props.onDelete) {
			// 		// 	props.onDelete(reminder);
			// 		// }
			// 	});
			// //} else {
            //     // if (props.onDelete) {
			// 	// 	props.onDelete(reminder);
			// 	// }
			// //}
		}
	})
);

export const UserPlanDeleteButton = enhance(UserPlanDeleteButtonPure);
