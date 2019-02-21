import List from '../components/List';
import { withProgramsQuery } from '../queries';
import {compose} from 'recompose';
import { withTableCursors } from '../../../../../components/Tables/hocs';


const enhance = compose(
    withProgramsQuery,
    withTableCursors
)
export const ProgramsList = enhance(List);
export default ProgramsList;