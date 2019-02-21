import React from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import DefaultI18nEn from '../../i18n/en';
export const getCardHeaderDate = (date, title) => {
    const dateMoment = moment.isMoment(date) ? date : moment(date);
    const isToday = dateMoment.isSame(new Date(), "day");
    return <FormattedMessage values={{isToday, title, date:dateMoment.format('ll')}} {...DefaultI18nEn.todaysSomething}    />;
}

