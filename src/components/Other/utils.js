import React from 'react';
import moment from 'moment';
import {Tooltip} from 'antd';

export const formatDateTimeToday = (date, opts) => {
    let {format, easyMode=false} = opts || {};
    if (!format) {
        format = 'lll';
    }
    if (easyMode) {
        format = 'l';
    }
    return formatDateToday(date, {...opts, format, todayTime:true})
}
// easy mode shows time if today, and date if not today
export const formatDateToday = (date, opts) => {
    if (!date) {
        return '';
    }
    const {todayTime=false, format='l', easyMode=false, tooltip=false, when=false} = opts || {};
    const dateMoment = moment.isMoment(date) ? date : moment(date);
    let formatted = '';
    if (dateMoment.isSame(new Date(), "day")) {
        if (when) {
            return 'Today';
        }
        // console.log(date);
        // console.log(dateMoment);
        if (todayTime) {
            if (!easyMode) {
                formatted = 'Today, ';
            }
            formatted += dateMoment.format('LT');
        } else {
            formatted = 'Today';
        }
    } else {
        if (when) {
            formatted += ' on ';
        }
        formatted += dateMoment.format(format)
    }
    if (tooltip) {
        return <Tooltip title={dateMoment.format('lll')}>{formatted}</Tooltip>;
    }
    return formatted;
}