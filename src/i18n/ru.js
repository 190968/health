import { defineMessages } from 'react-intl';

const DefaultI18nEn = defineMessages({
    
    "accept": {
        "id": "accept",
        "defaultMessage": "ППринять",
    },
    "todaysSomething": {
        "id": "todays.something",
        "defaultMessage": "{title} {isToday, select, true {на сегодня} false {на {date}}} ",
    },

});

export default DefaultI18nEn;