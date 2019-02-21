import RemindersButton from '../../../../../components/Reminders/components/RemindersButton';
import { withProps } from 'recompose';


export const TrackerRemindersButton = withProps(
    props => {
        const {tracker} = props;
        const {measurement} = tracker;
        const {label} = measurement;
        return {modalTitle: label+' – Reminders', simple:true, reminderInfo: {type:'tracker', id: measurement.id}}
    }
)(RemindersButton);