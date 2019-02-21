import React from 'react';
import {Timeline, Icon, Progress, Button, Card, Divider, Radio, List} from 'antd';
import { MedicationTakeButton } from '../../../../../containers/MedicationTakeButton';
import { FormattedMessage } from 'react-intl';
import {MedsI18nEn as messages} from '../../../../../i18n/en';

const MedicationTimelineItem = props => {
    const {title, quantity, medication, timesPerDay=1, reports=[], user, date, time, medicationPlan} = props;
    const { drug } = medication || {};
    const { name, dosage, form} = drug;

    let items = [];
    for (var i = 0; i < timesPerDay; i++) {
        //const report = (reports && reports[i]) || {};
        items.push(1);
    }
    let dot = null;
    console.log(reports, timesPerDay);
    if (reports) {
        if (reports && reports.length === timesPerDay) {
            dot = <Icon type={"check-circle"} theme="outlined" />;
        } else {
            dot = <Icon type="clock-circle-o" />;
        }
    }
    
    return <Timeline.Item dot={dot}>

    <div className={'medsTimelineTitle'}><strong>{title}</strong>  <span className={'pills'}><FormattedMessage values={{pills:quantity*timesPerDay}} {...messages.pillsPerDay} /></span></div>
    <div  className={'medsTimelineBody'}>

    <List
        grid={{ gutter: 2, xs: 1, sm: 2, md: 3 }}
        dataSource={items}
        renderItem={(item, i) => {
            //console.log(item);
           //console.log(reports && i<reports.length);
            const report = reports && reports.find(report => report.order === i);
            const isReported = report && report.isTaken || false;// i<reports.length;
            return <List.Item>
                <Card hoverable type={'medCard'} className={isReported ? 'medCardreported' : ''} >
                {/* <div className={'pillsNumber'} style={{float: 'left'}}>
                    {quantity > 1 ? quantity+'x' : quantity}
                </div> */}
                <div>
                    <div className={'title'}>{name}</div>
                    <div className={'dosage'}>{dosage}</div>
                    </div>
                    <MedicationTakeButton medication={medication} medicationPlan={medicationPlan} user={user} date={date} time={time} quantity={quantity} form={form} order={i} report={report} isTaken={isReported} />
                </Card>
            </List.Item>
        }}
    />
        

    </div>
</Timeline.Item>;
}

export default MedicationTimelineItem;