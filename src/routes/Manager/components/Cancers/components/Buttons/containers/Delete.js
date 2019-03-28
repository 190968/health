import Delete from '../components/Delete';
import {message} from 'antd';
import { withDeleteCancerMutation } from '../../../mutations';
import {compose, withHandlers} from 'recompose';
 

const enhance = compose(
	withDeleteCancerMutation,
	withHandlers({
		handleDelete: (props) => () => {
			// console.log(props);
			props.deleteCancer().then(() => {
                message.success('Deleted');
                if (props.refetch) {
                    props.refetch();
                }
            });
		}
	})
);

export const CancerDeleteButton = enhance(Delete);
export default CancerDeleteButton;