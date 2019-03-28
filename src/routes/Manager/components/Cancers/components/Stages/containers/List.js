import List from '../components/List';
import { withCancerStagesQuery } from '../queries';
import {compose} from 'recompose';
import { withTableCursors } from '../../../../../../../components/Tables/hocs';


const enhance = compose(
    withCancerStagesQuery,
    withTableCursors
)
export const CancerStagesList = enhance(List);
export default CancerStagesList;