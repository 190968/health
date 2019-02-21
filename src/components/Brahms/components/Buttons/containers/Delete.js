import Delete from '../components/Delete';
import {message} from 'antd';
i//mport { withDeleteBrahmMutation } from '../../../mutations';
import {compose, withHandlers} from 'recompose';
 

const enhance = compose(
	//withDeleteBrahmMutation,
	withHandlers({
		handleDelete: (props) => () => {
			props.deleteBrahm().then(() => {
                message.success('Deleted');
                if (props.refetch) {
                    props.refetch();
                }
            });
		}
	})
);

export const BrahmDeleteButton = enhance(Delete);
export default BrahmDeleteButton;