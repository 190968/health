import React from 'react';
import { Button, Card, Tooltip, Progress, Tag, Icon, Badge, Dropdown, Menu } from 'antd';
import { TrackerCardFull } from '../../containers/TrackerCardFull';
import './index.less';
import TrackerChart from '../../../Tracker/containers/Chart';
import { formatTrackerValue } from './components/TrackerCardValue';
import { formatDateToday } from '../../../../../../components/Other/utils';
import messages from './i18n/en';
import { FormattedMessage } from 'react-intl';


// export const getMedicationTotalPills = ({ medication }) => {
//     let total = 0;
//     const { type, timesPerDay, quantity, timesPerHour } = medication || {};
//     switch (type) {
//         case 'at_times':
//             timesPerHour.map(timePerHour => {
//                 total += timePerHour.quantity;
//                 return null;
//             })
//             break;
//         default:
//             return timesPerDay * quantity;
//             break;
//     }
//     return total;
// }

export const getMedicationReportedPills = ({ medication }) => {
    let total = 0;
    const { reports = [] } = medication || {};
    if (reports && reports.length > 0) {
        const takenReports = reports.filter(report => report.isTaken);
        console.log(takenReports);
        total = takenReports.length;
    }
    return total;
}
export const getMedicationQuantity = ({ medication }) => {
    let total = 0;
    const { type, timesPerDay, quantity, timesPerHour } = medication || {};
    switch (type) {
        case 'at_times':
            if (timesPerHour && timesPerHour.length > 0) {
                total = timesPerHour[0].quantity;
            }
            break;
        default:
            total = quantity;
            break;
    }
    return total;
}

const getTrackerCardReport = ({ measurement }) => {
    const { getLastReport, reports = [] } = measurement || {};
    const reportsNum = reports.length;
    if (reportsNum > 0) {
        // use last report
        return reports[reports.length - 1];
    } else {
        return getLastReport;
    }
}

const TrackerCard = (props) => {
    const { showModal, toggleModal, i, ...otherProps } = props;
    const { tracker, user, date, biometricPlan } = otherProps;
    const { measurement, timesToReport, columns = [] } = tracker || {};
    const { reports = [] } = measurement || {};
    const cardReport = getTrackerCardReport({ measurement });
    let { isCritical = false, value, valueFormatted, reportedOn } = cardReport || {};
    const {canReport} = biometricPlan || {};

    const reportsNum = reports.length;
    const columnsNum = columns.length || 1;
    const totalToReport = timesToReport * columnsNum;//;
    const progress = Math.round(reportsNum / totalToReport * 100);
    let isReportedToday = reportsNum;

    const isCompleted = progress === 100;// reportsNum*columnsNum/timesToReport;
    const reportsLeft = totalToReport - reportsNum;

    let reportedTitle = <Progress percent={progress} showInfo={progress > 0} />;
    if (!isCompleted) {
        if (!isReportedToday && value) {
            reportedTitle = <div style={{ marginTop: 3 }}><FormattedMessage {...messages.lastReport} values={{value: formatTrackerValue({ measurement, value:valueFormatted, withUnits:true }), date: formatDateToday(reportedOn, { todayTime: true })}} /></div>;
        } else {
            //reportedTitle = 'Need to report '+reportsLeft+' times on '+moment(date).format('l');
        }
    }
    //console.log(valueFormatted);
    const valueToShow = <React.Fragment><Tooltip title={<FormattedMessage values={{date: formatDateToday(reportedOn, { todayTime: true })}} {...messages.reportedOn} />} >{formatTrackerValue({ measurement, value:valueFormatted })}</Tooltip> <span className={'units'}>{measurement.units.name}</span></React.Fragment>;
    return (<React.Fragment>
        {showModal && <TrackerCardFull {...otherProps} onHide={toggleModal} />}
        <Card hoverable bordered={true} hoverable type={'trackerCard ' + (isReportedToday && isCritical ? 'trackerCardCritical ' : '')} onClick={toggleModal} className={(!isReportedToday ? ' todayNoReport' : '')}  >
            <div className={'title'}>{measurement.label}</div>
            {isReportedToday ? <div className={'value'}>
                <span className={'valueClickable'}>{valueToShow}</span>
            </div> : <div className={'notReported'}>{'Not Reported ' + formatDateToday(date, { when: true })+ ' Yet'}</div>}
            
            {/* <div className={'setting'}><TrackerSettingsButton tracker={tracker} user={user} date={date} /></div> */}
            <div className={'graph'}><TrackerChart item={measurement} user={user} date={date} size={'tiny'} /></div>
            <div className={'reportedOn'}>
                {reportedTitle}
            </div>
        </Card>
    </React.Fragment>
    );
};

export default TrackerCard;