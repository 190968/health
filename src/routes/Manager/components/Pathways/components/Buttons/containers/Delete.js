import PathwayDeleteButtonPure from '../components/Delete';
import {message} from 'antd';
// import { withDeleteCancerStageMutation } from '../../../mutations';
import {compose, withHandlers} from 'recompose';
import { withDeletePathwayMutation } from '../../../../../../../components/Plan/mutations';
 

const enhance = compose(
	withDeletePathwayMutation,
	withHandlers({
		handleDelete: (props) => () => {
			props.deletePathway().then(() => {
                message.success('Deleted');
                if (props.refetch) {
                    props.refetch();
                }
            });
		}
	})
);

export const PathwayDeleteButton = enhance(PathwayDeleteButtonPure);
export default PathwayDeleteButton;