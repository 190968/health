import Delete from '../components/Delete';
import {message} from 'antd';
import { withDeleteActionplanMutation } from '../../../mutations';
import {compose, withHandlers} from 'recompose';
 

const enhance = compose(
	withDeleteActionplanMutation,
	withHandlers({
		handleDelete: (props) => () => {
			props.deleteActionplan().then(() => {
                message.success('Deleted');
                if (props.refetch) {
                    props.refetch();
                }
            });
		}
	})
);

export const ActionplansDeleteButton = enhance(Delete);
export default ActionplansDeleteButton;