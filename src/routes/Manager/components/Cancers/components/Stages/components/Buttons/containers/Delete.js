import Delete from '../components/Delete';
import {message} from 'antd';
import { withDeleteCancerStageMutation } from '../../../mutations';
import {compose, withHandlers} from 'recompose';
 

const enhance = compose(
	withDeleteCancerStageMutation,
	withHandlers({
		handleDelete: (props) => () => {
			props.deleteCancerStage().then(() => {
                message.success('Deleted');
                if (props.refetch) {
                    props.refetch();
                }
            });
		}
	})
);

export const CancerStageDeleteButton = enhance(Delete);
export default CancerStageDeleteButton;