import List from '../components/List';
import { withCampaignsQuery } from '../queries';
import { withTableCursors } from '../../../../../components/Tables/hocs';


export const CampaignsList = withCampaignsQuery(withTableCursors(List));
export default CampaignsList;