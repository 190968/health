import PathwayFlow from  '../components/PathwayFlow';
import {compose} from 'recompose';
import { withModal } from '../../../../../components/Modal';


const enhance = compose(
    withModal
)


export default PathwayFlow;