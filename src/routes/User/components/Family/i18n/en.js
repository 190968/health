import { defineMessages } from 'react-intl';

export default defineMessages({
    "myFamily": {
        "id": "user_family_title",
        "defaultMessage": "{isSelf, select, true {My } false {}} Family {count,  plural, =0 {} other {({count})}}",
        "description": "My Family"
    },
    "noFamily": {
        "id": "user_family_empty",
        "defaultMessage": "No Family Members",
        "description": "No Family Members"
    }
});