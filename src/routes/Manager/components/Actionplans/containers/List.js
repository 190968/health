import List from '../components/List';
import { withActionplansQuery } from '../queries';
import {compose} from 'recompose';
import { withTableCursors } from '../../../../../components/Tables/hocs';


const enhance = compose(
    withActionplansQuery,
    withTableCursors
)
export const ActionplanssList = enhance(List);
export default ActionplanssList;