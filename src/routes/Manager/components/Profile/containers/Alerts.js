import Alerts from '../components/Alerts';
import {compose} from 'recompose';
import {withNotificationsQuery} from "../../../../../layouts/components/Header/containers/Notifications";


const enhance = compose(
    withNotificationsQuery
);

export default enhance(Alerts);