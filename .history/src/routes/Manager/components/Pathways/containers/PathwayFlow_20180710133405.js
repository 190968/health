import PathwayFlow from  '../components/PathwayFlow';
import {compose, withProps} from 'recompose';
import { withModal } from '../../../../../components/Modal';


const enhance = compose(
    withProps(props => {
        return {
            modalTitle: 'View Flow'
        }
    }),
    withModal
)


export default enhance(PathwayFlow);