import CalendarEventPure from '../components/CalendarEvent';
import { withDrawer } from '../../../components/Modal';
import {compose, withProps} from 'recompose';

const enhance = compose(
    withProps(props => {
        const {event} = props;
        const {title} = event || {};
        return {
            modalTitle:title
        }
    }),
    withDrawer
);
export const CalendarEvent = withDrawer(CalendarEventPure);