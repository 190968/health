import List from '../components/List';
import { withCancersQuery } from '../queries';
import {compose} from 'recompose';
import { withTableCursors } from '../../../../../components/Tables/hocs';


  export default  compose(
    withCancersQuery,
    withTableCursors
)(List);
