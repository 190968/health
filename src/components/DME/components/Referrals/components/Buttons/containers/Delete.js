import Delete from '../components/Delete';
import {message} from 'antd';
//import { withDeleteBrahmMutation } from '../../../mutations';
import {compose, withHandlers} from 'recompose';
import { withDmeReferralMutation } from '../../../../../mutations';
 

const enhance = compose(
    //withDeleteBrahmMutation,
    withDmeReferralMutation,
	withHandlers({
		handleDelete: (props) => () => {
			props.deleteDmeReferral().then(() => {
                message.success('Deleted');
                if (props.refetch) {
                    props.refetch();
                }
            });
		}
	})
);

export const DmeReferralsDeleteButton = enhance(Delete);
export default DmeReferralsDeleteButton;