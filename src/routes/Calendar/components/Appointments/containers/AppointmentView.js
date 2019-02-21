import AppointmentViewPure from '../components/AppointmentView';
import { withDrawer } from '../../../../../components/Modal';
import {compose, withProps} from 'recompose';
const enhance = compose(
    withProps(props => {
        return {
            modalTitle: 'View Event',
            modalFooter: 'close'
        }
    }),
    withDrawer
)
const AppointmentView = enhance(AppointmentViewPure);

export default AppointmentView;