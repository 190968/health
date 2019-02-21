import BasicPure from '../components/Basic';
import Advocates from '../components/Advocate';
import {compose, branch, renderComponent} from 'recompose';
import { withActiveNetwork, withActiveUser } from '../../../../components/App/app-context';


const enhance = compose(
    withActiveNetwork,
    withActiveUser,
    branch(props => {
        const { currentUser } = props;
        const { currentRole = false } = currentUser || {};
        return currentRole === 'advocate';
    }, renderComponent(Advocates))
);
const Basic = enhance(BasicPure);
export default Basic;