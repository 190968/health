import { defineMessages } from 'react-intl';

export default defineMessages({
    'myReferrals': {
        "id": "patient.referrals",
        "defaultMessage": "{isSelf, select, true {My } false {}} Referrals {count,  plural, =0 {} other {({count})}}",
        "description": "My Motivators"
    },
    'noReferrals': {
        "id": "patient.referrals.empty",
        "defaultMessage": "No Referrals",
        "description": "No Referrals"
    },
    
});