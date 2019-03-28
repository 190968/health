import moment from 'moment';

export const getMomentFromDate = (date, format = 'HH:mm') => {
    return date && moment.utc(date);
}
export const getMomentFromDateToLocal = (date) => {
    return date && moment(date).local();
}

export const getMomentFromUTCTime = (time, format = 'HH:mm:ss') => {

    // let dateStr = new Date(),
    //     // timeStr = '18:00',
    //     date    = moment.utc(dateStr);
    //     const dateTime = date.format('YYYY-MM-DD')+' '+timeStr;
    //     const time    =  moment.utc(dateTime);
        // console.log(timeStr);
        // console.log(dateTime);
    //     console.log(date);
    //     console.log(time.get('hour'));
    //     console.log(time.get('minute'));
    // const newDate = date.set({
    //     hour:   time.get('hour'),
    //     minute: time.get('minute'),
    //     second: time.get('second')
    // });
    // console.log(newDate);
    // console.log(date);
    // console.log(time);
    // return timeStr;
    return time && moment.utc(time, format).local();
}

export const prepareTimeInput = (time, format = 'HH:mm') => {
    return moment.utc(time, format).format('HH:mm:ss');
}

export const prepareDateInput = (date, props) => {
    const {utc=false} = props || {};
    if (utc) {
        return date.utc().format('YYYY-MM-DD');
        // console.log( );
        // const offset = date.utcOffset()/60;
        // console.log(date.get('hour')+offset);
        // if (date.get('hour')+offset > 24) 
        // date.add(1, 'd'); // Add 1 day, so that t is tomorrow's date at the same time
    }
    return date.format('YYYY-MM-DD');
}
export const prepareDateTimeInput = (date, time, props) => {
    const {utc=true} = props || {};
    let d = date
    d = d.format('YYYY-MM-DD');
    let t = time;
    
    t = t.format('HH:mm:ss');

    const dateTime = moment(d+ ' ' +t,'YYYY-MM-DD HH:mm:ss');//.utc();
    return dateTime;
// console.log(date);
// console.log(time);
// console.log(time.get('hour'));
// console.log(time.get('minute'));
// console.log(time.get('second'));
    date.set({
        hour:   time.get('hour'),
        minute: time.get('minute'),
        second: '00'
    });
    return date.local();//.format('YYYY-MM-DD');
}