import AppointmentListItemPure from '../components/AppointmentListItem';
import { withToggleModal } from '../../../../../components/Modal';

export const AppointmentListItem = withToggleModal(AppointmentListItemPure);
export default AppointmentListItem;