import TrackerCardFullPure from '../components/TrackerCardFull';
import { withDrawer } from '../../../../../components/Modal';
import {compose, withProps} from 'recompose';
import { withBiometricTrackerQuery } from '../queries';
import { withDateState } from '../../../../../components/Other/dateHocs';
const enhance = compose(
    withDateState,
    withBiometricTrackerQuery,
    withProps(props => ({
        modalTitle:props.tracker.measurement.label,// +' - '+moment(props.date).format('llll'),
        modalFooter:false,
        modalWidth:600
    })),
    withDrawer
);
export const TrackerCardFull = enhance(TrackerCardFullPure);