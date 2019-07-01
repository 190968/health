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


export const formatDate = (date, opts) => {
    let {format='l'} = opts || {};
    // if (!format) {
    //     format = 'lll';
    // }
    // if (easyMode) {
    //     format = 'l';
    // }
    return formatDateToday(date, {...opts, format, todayTime:false})
}

export const formatTimeForInput = (time) => {

    return moment.utc(time).format('HH:mm:ss');
}


export const formatTimeForField = (time, props) => {
    const {isUTC=false} = props || {};// if the value us in UTC
    //  console.log(time, 'timetimetimetime');
    //     console.log(moment.utc(time, 'HH:mm').format('LT'));
    //     console.log(moment(time, 'HH:mm').format('LT'));
    // let d = moment();
    // d = d.format('YYYY-MM-DD');
    // let t = moment(time, 'HH:mm');
    
    // t = t.format('HH:mm:ss');

    // const dateTime = moment.utc(d+ ' ' +t,'YYYY-MM-DD HH:mm:ss');
    // const dateTime1 = moment.utc(d+ ' ' +t,'YYYY-MM-DD HH:mm:ss');
    // console.log(dateTime);
    // console.log(dateTime.format('llll'));
    // console.log(dateTime1.local().format('llll'));

    if (isUTC) {
        // console.log(time, 'timetimetimetime');
        // console.log(moment.utc(time, 'HH:mm'));
        // console.log(moment(time, 'HH:mm'));
        return time && moment.utc(time, 'HH:mm').local();
    }
    return time && moment(time, 'HH:mm');
}
export const formatTimeForRender = (time) => {

    return formatTimeForField(time).format('LT');
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

export const getSQLDateToday = props => {
    return moment().format('YYYY-MM-DD')
}