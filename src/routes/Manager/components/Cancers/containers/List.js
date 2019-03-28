import List from '../components/List';
import { withCancersQuery } from '../queries';
import {compose} from 'recompose';
import { withTableCursors } from '../../../../../components/Tables/hocs';


const enhance = compose(
    withCancersQuery,
    withTableCursors
)
export const CancersList = enhance(List);
export default CancersList;