import List from '../components/List';
import { withPersonalNotesQuery } from '../queries';
import {compose} from 'recompose';
import { withTableCursors } from '../../../../../components/Tables/hocs';


const enhance = compose(
    withPersonalNotesQuery,
    withTableCursors
)
export const PersonalNotesList = enhance(List);
export default PersonalNotesList;