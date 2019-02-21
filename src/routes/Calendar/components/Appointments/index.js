import React from 'react';
import {Tooltip, Card, Icon, Button} from 'antd';
import { Link } from 'react-router-dom';
import { AppointmentListItem } from './containers/AppointmentListItem';
import { ListWithMessage } from '../../../../components/UI/List';
import {CalendarAppointmentButton} from '../Calendar/containers/CalendarAppointmentButton';
import {
    FormattedMessage,
} from 'react-intl';

import {CalendarI18nEn as messages} from '../Calendar/i18n/en';
import { withActiveUserSimple } from '../../../../components/App/app-context';

const Appointemnts = props => {
    const {loading,events=[],totalCount=0, hideIfEmpty=false, user, isSelf=false, refetch } = props;
    if (hideIfEmpty && events.length == 0) {
        return null;
    }
    return <Card loading={loading} className={'tour-appointments'} title={<FormattedMessage values={{isSelf, name:user.firstName, count:totalCount}} {...messages.myAppointments} />} extra={<Button.Group><Tooltip title={<FormattedMessage  {...messages.viewCalendar} />}><Button size={'small'} ><Link to={'/calendar'} ><Icon  type={'calendar'}  /></Link></Button></Tooltip><CalendarAppointmentButton user={user} refetch={refetch} mode={'upcoming'} /></Button.Group>}>
        <ListWithMessage
        size={'small'}
        itemLayout="vertical"
        dataSource={events}
        emptyMessage={<FormattedMessage  {...messages.noAppointments} />}
        renderItem={event => (
            <AppointmentListItem key={event.id} event={event} />
        )}
    /> 
</Card>
}

export default withActiveUserSimple (Appointemnts);