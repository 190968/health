import List from '../components/List';
// import { withBrahmsQuery } from '../queries';
import {compose} from 'recompose';
import { withTableCursors } from '../../Tables/hocs';


const enhance = compose(
    // withBrahmsQuery,
    withTableCursors
)
export const BrahmsList = enhance(List);
export default BrahmsList;