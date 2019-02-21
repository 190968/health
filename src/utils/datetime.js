import moment from 'moment';

export const getMomentFromDate = (date, format = 'HH:mm') => {
    return date && moment.utc(date);
}

export const getMomentFromUTCTime = (time, format = 'HH:mm') => {
    return time && moment.utc(time, format).local();
}

export const prepareTimeInput = (time, format = 'HH:mm') => {
    return moment.utc(time, format).format('HH:mm:ss');
}

export const prepareDateInput = (date) => {
    return date.format('YYYY-MM-DD');
}