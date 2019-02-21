import DeleteButton from '../components/Delete';
import { compose, withHandlers } from 'recompose';
import { withDeleteUserAssessmentMutation } from '../../../mutations';

const enhance = compose(
	withDeleteUserAssessmentMutation,
	withHandlers({
		handleDelete: (props) => () => {
			props.deleteUserAssessment().then(() => {
                if (props.refetch) {
                    props.refetch();
                }
            });
		}
	})
);
export const UserAssessmentDeleteButton = enhance(DeleteButton);
