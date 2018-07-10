import PathwayFlow from  '../components/PathwayFlow';
import {compose, withProps} from 'recompose';
import { withModal } from '../../../../../components/Modal';


const enhance = compose(
    withModal
)


export default PathwayFlow;