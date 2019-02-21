import List from '../components/List';
import { withNetworkProvidersQuery } from '../queries';
import {compose} from 'recompose';
import { withTableCursors } from '../../../../../components/Tables/hocs';


const enhance = compose(
    withNetworkProvidersQuery,
    withTableCursors
)
export const ProvidersList = enhance(List);
export default ProvidersList;