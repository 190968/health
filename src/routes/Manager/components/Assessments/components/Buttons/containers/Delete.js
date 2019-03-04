import DeleteButton from '../components/Delete';
import {message} from 'antd';
import { compose, withHandlers } from 'recompose';
import { withDeleteUserAssessmentMutation } from '../../../mutations';
import { withDeleteAssessmentMutation } from '../../../../../../../components/Assessment/mutations';

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


const enhance2 = compose(
	withDeleteAssessmentMutation,
	withHandlers({
		handleDelete: (props) => () => {
			props.deleteAssessment().then(() => {

				message.success('Deleted');
                if (props.refetch) {
                    props.refetch();
                }
            });
		}
	})
);
export const AssessmentDeleteButton = enhance2(DeleteButton);
