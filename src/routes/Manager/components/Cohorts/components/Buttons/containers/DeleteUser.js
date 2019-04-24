import DeleteUser from '../components/DeleteUser';
import {compose, withHandlers} from 'recompose';
import { withDeleteCohortUserMutation } from '../../../mutations';
 

const enhance = compose(
	withDeleteCohortUserMutation,
	withHandlers({
		handleDelete: (props) => () => {
			props.deleteCohortUser().then(() => {
                if (props.refetch) {
                    props.refetch();
                }
            });
		}
	})
);

export const CohortDeleteUserButton = enhance(DeleteUser);
export default CohortDeleteUserButton;