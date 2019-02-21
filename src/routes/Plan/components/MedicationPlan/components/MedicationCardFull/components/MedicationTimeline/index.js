import React from 'react';
import MedicationTimelineItem from './components/MedicationTimelineItem';
import moment from 'moment';
import {Timeline, Icon, Progress, Button, Card, Divider, Radio, List} from 'antd';
import { FormattedMessage } from 'react-intl';
import {MedsI18nEn as messages} from '../../../../i18n/en';

const MedicationTimeline = props => {
    const {medication} = props;
    const { drug, type, timesPerDay, quantity, timesPerHour, reports} = medication || {};

    let timelineItems = '';
    switch(type) {
        case 'at_times':
            timelineItems = timesPerHour.map((timePerHour, i) => {
                const {id,quantity:quantityPerTime, time} = timePerHour;
                const datetime = moment(time, 'HH:mm');
                const thisReports = reports && reports.filter(report => report.time === time);
                //console.log(thisReports);
                return <MedicationTimelineItem key={i} title={datetime.format('LT')} quantity={quantityPerTime} {...props} time={time} reports={thisReports} />
            });
            //timelineItems
        break;
        default:
        //const isReported = reports &&reports.length;
            timelineItems = <MedicationTimelineItem title={<FormattedMessage values={{type}} {...messages.text} />} quantity={quantity} timesPerDay={timesPerDay} {...props} reports={reports} />
        // takeDailyData.push({
        //     key: medication.id + 'drug',
        //     name: <MedicationInfo user_id={user_id} date={date} info={medication}/>,
        //     report: rows
        // });
        break;
    }  
    return <Timeline>
                {timelineItems}
                {/* <Timeline.Item></Timeline.Item> */}
                {/* <Timeline.Item dot={<Icon type="check-circle" theme="outlined" />}>1pm</Timeline.Item> */}
                {/* <Timeline.Item dot={<Progress type="circle" percent={10} width={16} />}>2pm <Button shape="check-circle" ghost /> <Button shape="check-circle" /></Timeline.Item> */}
                {/* <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">5pm <Button shape="check-circle" ghost /> <Button shape="check-circle" /></Timeline.Item> */}
            </Timeline>;
}

export default MedicationTimeline;