import List from '../components/List';
import { withChemotherapysQuery } from '../queries';
import {compose} from 'recompose';
import { withTableCursors } from '../../../../../components/Tables/hocs';


const enhance = compose(
    withChemotherapysQuery,
    withTableCursors
)
export const ChemotherapysList = enhance(List);
export default ChemotherapysList;