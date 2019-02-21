import Delete from '../components/Delete';
import {message} from 'antd';
import { withDeleteScreeningMutation } from '../../../mutations';
import {compose, withHandlers} from 'recompose';
 

const enhance = compose(
	withDeleteScreeningMutation,
	withHandlers({
		handleDelete: (props) => () => {
			props.deleteScreening().then(() => {
                message.success('Deleted');
                if (props.refetch) {
                    props.refetch();
                }
            });
		}
	})
);

export const ScreeningDeleteButton = enhance(Delete);
export default ScreeningDeleteButton;