import { defineMessages } from 'react-intl';

export const RemindersI18nEn = defineMessages({
    "reminder": {
        "id": "reminder",
        "defaultMessage": "Reminder",
        "description": "Reminder"
    },
    "reminders": {
        "id": "reminders",
        "defaultMessage": "Reminders",
        "description": "Reminders"
    },
    "remindersTitle": {
        "id": "reminders.title",
        "defaultMessage": "{title} Reminders",
        "description": "{title} Reminders"
    },
    "remindersEmpty": {
        "id": "reminders.empty",
        "defaultMessage": "Click + to Set Up Reminders",
        "description": "Click + to Set Up Reminders"
    },
    "noReminders": {
        "id": "reminders.noReminders",
        "defaultMessage": '{editableTime, select, true {No Reminders Yet. Click "New Reminder" to add first} other {No Reminders Yet}}',
        "description": "No Reminders"
    },
    "removeConfirm": {
        "id": "reminders.removeConfirm",
        "defaultMessage": "Are you sure delete this reminder?",
        "description": "Are you sure delete this reminder?"
    },
});

export default RemindersI18nEn;