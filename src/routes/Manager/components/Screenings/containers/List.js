import List from '../components/List';
import { withScreeningsQuery } from '../queries';
import { withTableCursors } from '../../../../../components/Tables/hocs';


export const ScreeningsList = withScreeningsQuery(withTableCursors(List));
export default ScreeningsList;