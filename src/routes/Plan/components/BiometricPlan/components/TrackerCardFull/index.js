import React from 'react';
import { Button, Card, Tooltip,Divider, Col, Progress, Tag, Icon, Badge } from 'antd';
import VMasker from 'vanilla-masker'
import moment from 'moment';
import './index.less';
import TrackerChart from '../../../Tracker/containers/Chart';
import TrackersTable from './components/TrackersTable';
import { DrawerFooter } from '../../../../../../components/Modal';
import TrackerSettingsButton from '../Biometric/components/TrackerSettingsButton';
import { TrackerHistory } from '../../../../../../components/Tracker/containers/TrackerHistory';
import { RemindersList } from '../../../../../../components/Reminders/containers/RemindersList';
import { formatTrackerValue } from '../TrackerCard/components/TrackerCardValue';
import { getCardHeaderDate } from '../../../../../../components/Card/utils';
import { formatDateToday } from '../../../../../../components/Other/utils';
import { EmptyList } from '../../../../../../components/Loading';
 

const TrackerCardFull = (props) => {
    const {showModal, toggleModal, ...otherProps} = props;
    const {biometricPlan, tracker, user, date} = otherProps;
    const {measurement, isValidOnDate} = tracker || {};
    const {getLastReport, reports, inputMask} = measurement;
    const {canReport} = biometricPlan;
    let {value} = getLastReport || {};
    let haveReport = value;
    if (value) {
        value = formatTrackerValue({measurement, value});
    } else {
        value = 'N/A';
    }

    if (!isValidOnDate) {
        return <React.Fragment>
        <Card title={<React.Fragment>
            Report for {formatDateToday(date, {format: 'll'})}
        </React.Fragment>} type={'table ant-card-type-inner'} extra={<Button.Group>
                <Tooltip title={'Previous day'}><Button onClick={() => props.showDate('prev')} size={'small'} icon={'left'} /></Tooltip>
                <Tooltip title={'Next day'}><Button icon={'right'} size={'small'} onClick={() => props.showDate('next')} /></Tooltip>
                </Button.Group>} >
            <EmptyList>Tracker is not scheduled on this date</EmptyList>
        </Card>
         

        <DrawerFooter>
            <TrackerSettingsButton biometricPlan={biometricPlan} tracker={tracker} user={user} date={date} placement={'topRight'} />
        </DrawerFooter>
        </React.Fragment>
    }
    
	return (<React.Fragment>
        
		<Card title={<React.Fragment>
            Report for {formatDateToday(date, {format: 'll'})}
        </React.Fragment>} type={'table ant-card-type-inner'} extra={<Button.Group>
                <Tooltip title={'Previous day'}><Button onClick={() => props.showDate('prev')} size={'small'} icon={'left'} /></Tooltip>
                <Tooltip title={'Next day'}><Button icon={'right'} size={'small'} onClick={() => props.showDate('next')} /></Tooltip>
                </Button.Group>} >
            <TrackersTable {...otherProps} />
		</Card>
        <Card title={'Summary'} type={'inner'}>
            <div style={{height:200}} >
            <TrackerChart item={measurement} user={user} date={date} size={'full'} />
            </div>
        </Card>

        <TrackerHistory measurement={measurement}  user={user} date={date} />

        <RemindersList reminderInfo={{id: measurement.id, type: 'tracker'}} user={user} title={'Tracker'} />
        <DrawerFooter>
        <TrackerSettingsButton biometricPlan={biometricPlan} tracker={tracker} user={user} date={date} placement={'topRight'} />
        </DrawerFooter>
        </React.Fragment>
	);
};

export default TrackerCardFull;
