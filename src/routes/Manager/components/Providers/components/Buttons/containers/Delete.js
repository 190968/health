import Delete from '../components/Delete';
import {message} from 'antd';
import { withDeleteProviderMutation } from '../../../mutations';
import {compose, withHandlers} from 'recompose';
 

const enhance = compose(
	withDeleteProviderMutation,
	withHandlers({
		handleDelete: (props) => () => {
			props.deleteProvider().then(() => {
                message.success('Deleted');
                if (props.refetch) {
                    props.refetch();
                }
            });
		}
	})
);

export const ProviderDeleteButton = enhance(Delete);
export default ProviderDeleteButton;