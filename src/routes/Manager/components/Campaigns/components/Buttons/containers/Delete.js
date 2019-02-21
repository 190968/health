import Delete from '../components/Delete';
import {message} from 'antd';
import { withDeleteCampaignMutation } from '../../../mutations';
import {compose, withHandlers} from 'recompose';
 

const enhance = compose(
	withDeleteCampaignMutation,
	withHandlers({
		handleDelete: (props) => () => {
			props.deleteCampaign().then(() => {
                message.success('Deleted');
                if (props.refetch) {
                    props.refetch();
                }
            });
		}
	})
);

export const CampaignDeleteButton = enhance(Delete);
export default CampaignDeleteButton;