import React from 'react';
import {Input, Icon, Tooltip, Carousel} from 'antd';
import StringMask from 'string-mask';
import Inputmask from 'inputmask';
import { TrackerInput } from '../../../../../Tracker';

export const formatTrackerValue = props => {
    const {measurement, withUnits=false} = props;
    const {inputMask, units} = measurement || {};
    const {name:unitsName=''} = units || {};
    let {report} = props;
    let {value} = props;
    //console.log(report);
    if (report) {
        const {value:reportedValue} = report;
        if (reportedValue) {
            value = reportedValue;
        }
    }
    //console.log(measurement);
    if (value && value !== '') {
        if (inputMask && inputMask !== '') {


           // value = Inputmask.format(value, { mask: "999/9{1,3}"});
            //console.log(value);
            //console.log(formattedValue);
            value = value.replace(/\D/g,'');
            
            const mask = new StringMask(inputMask);
            value = mask.apply(value); // 123
            
        }
        if (withUnits) {
            value += unitsName;
        }
        //value = inputMask !== '' ? VMasker.toPattern(value, inputMask) : VMasker.toNumber(value);
    } else {
        value = '';
    }
    return value;
}
const TrackerCardValue = props => {
    const {showModal, toggleModal, ...otherProps} = props;
    const {tracker, user, date} = otherProps;
    const {measurement, timesToReport=0, columns} = tracker || {};
    const {reports=[], getLastReport, inputMask} = measurement || {};
    
    //let isToday = lastReportDate && moment(lastReportDate).isSame(moment(date), "day");
    

    const reported = reports.length;
    let report = null;
    const haveReports = reported > 0;
    if (haveReports) {
        report = reports[reported-1];
    } else {
        report = getLastReport;
    }
    let {value, date:lastReportDate} = report || {};
    let placeholder = 'Enter '+measurement.label;

    value = formatTrackerValue({measurement, value});
    // if (value) {
    //     value = inputMask !== '' ? VMasker.toPattern(value, inputMask) : VMasker.toNumber(value);
    // } else {
    //     value = '';
    // }
    if (!haveReports) {
        placeholder = value;
        value = '';
    }

	// const { user, date, medication, reports } = otherProps;
    // const { drug } = medication || {};
    // const { name, dosage, form } = drug;
    // const reportedNum = getMedicationReportedPills({medication});
    // const total = getMedicationTotalPills({medication});
    // const quantity = getMedicationQuantity({medication});
    // console.log(reports);
    // const reported = reportedNum*quantity;
    // const prescription = 'Take '+total+' pills';
     const progress = Math.round(reported/timesToReport*100);
     const isReported = progress===100;//reports && i<reports.length;
    // // get latest report date
    // const reportedTimes = reports && reports.map(report => report.reportedOn);
    // let lastReported = false;
    // //console.log(reportedTimes);
    // if (reportedTimes && reportedTimes.length > 0) {
    //     lastReported  = Math.max( ...reportedTimes );
    //     lastReported = moment(lastReported).format('LT');
    // }
    // console.log(tracker);
    // console.log(user);

    return <React.Fragment>

        {!showModal && <div className={'createReport'}><Tooltip title={'New report'}><Icon type="plus-circle" onClick={toggleModal} theme="outlined" /></Tooltip></div>}
    {showModal? <TrackerInput item={measurement} value={value} placeholder={placeholder} onChange={props.onChange} suffix={<React.Fragment> {!haveReports && <Tooltip title={'Select Date'}><Icon type="calendar" theme="outlined" /></Tooltip>} <Tooltip title={'Save Report'}><Icon type="check-circle" style={{color: '#fff'}} onClick={props.reportOnTracker} /></Tooltip> {haveReports && <Icon type="close-circle" onClick={toggleModal} />} </React.Fragment>}/> : <Tooltip title={'Update report'}><span className={'valueTxt'} onClick={toggleModal}>{value}</span></Tooltip>}
    </React.Fragment>
}

export default TrackerCardValue;