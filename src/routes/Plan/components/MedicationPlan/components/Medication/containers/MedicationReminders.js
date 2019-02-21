import MedicationRemindersPure from '../components/MedicationReminders';
import {compose, withProps, branch, renderComponent} from 'recompose';
import { withDrawer, withSpinnerWhileLoading } from '../../../../../../../components/Modal';
import { withRemindersQuery } from '../../../../../../../components/Reminders/containers/queries';
import { MedicationReminderManager } from '../components/MedicationReminders/containers/MedicationReminderManager';
import { RemindersList } from '../../../../../../../components/Reminders/containers/RemindersList';
import { FormattedMessage } from 'react-intl';
import RemindersI18nEn from '../../../../../../../components/Reminders/i18n/en';

const enhance = compose(
    withProps(props => {
        const {medication} = props;
        const {drug} = medication || {};
        const {name} = drug || {};
        return {
            modalTitle: name+' – Reminders',//<FormattedMessage {...RemindersI18nEn.reminders} />
            modalWidth:600,
            reminderInfo: {id:medication.id, type:'medication'}
        }
    }),
   // withRemindersQuery,
    //branch(props => props.simple, renderComponent(MedicationReminderManager)),
    //withDrawer,
    withSpinnerWhileLoading
    
);
export const MedicationReminders = enhance(RemindersList);
export const MedicationRemindersModal = MedicationReminders