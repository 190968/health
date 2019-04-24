import {TrackerInput as TrackerInputPure} from '../components/Tracker'
import { withTrackerReportMutation } from '../components/BiometricPlan/components/TrackerCard/containers/TrackerCardValue';
import { compose, withProps } from 'recompose';
import { withDrawer } from '../../../components/Modal';
export const TrackerInput = withTrackerReportMutation(TrackerInputPure);

const enhance = compose(
    withTrackerReportMutation,
    withProps(props => {
        const {measurement} = props;
        const {label} = measurement || {};
        return {modalTitle:'Report on '+(label || 'tracker')}
    }),
    withDrawer
);
export const TrackerInputModal = enhance(TrackerInputPure);
export default TrackerInput;






