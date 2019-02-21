import { defineMessages } from 'react-intl';

export const CalendarI18nEn = defineMessages({
    "myAppointments": {
        "id": "user_appointments_title",
        "defaultMessage": "{isSelf, select, true {My } false {{name}}} Upcoming Events {count, plural, =0 {} other {({count})}}",
        "description": "My Events"
    },
    "noAppointments": {
        "id": "user_appointments_empty",
        "defaultMessage": "No Upcoming Events",
        "description": "No Upcoming Events"
    },
    "addAppointment": {
        "id": "add_appointment",
        "defaultMessage": "Add Event",
        "description": "Add Event"
    },
    "calendar": {
        "id": "calendar",
        "defaultMessage": "Calendar",
        "description": "Calendar"
    },
    "viewCalendar": {
        "id": "view_calendar",
        "defaultMessage": "View Calendar",
        "description": "View Calendar"
    },
    
});