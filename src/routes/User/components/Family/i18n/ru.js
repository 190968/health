/**
 * Created by Павел on 02.02.2018.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    "myFamily": {
        "id": "user_family_title",
        "defaultMessage": "{isSelf, select, true {Моя } false {}} Семья {count,  plural, =0 {} other {({count})}}",
        "description": "Моя семья"
    },
    "noFamily": {
        "id": "user_family_empty",
        "defaultMessage": "Нет Членов семьи",
        "description": "Нет Членов семьи"
    }
});