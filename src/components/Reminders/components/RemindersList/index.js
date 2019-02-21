import React from 'react';
import moment from 'moment';

import { Button, Icon, Card, Modal, TimePicker, Checkbox, Form, Table } from 'antd';
import { EmptyList } from '../../../Loading';
import RemindersManagerButton from '../RemindersManagerByTime/components/RemindersManagerButton';
import { FormattedMessage } from 'react-intl';
import messages from '../../../../i18n/en';
import messagesReminders from '../../i18n/en';



const columns = [{
    title: <FormattedMessage {...messages.time} />,
    dataIndex: 'time',
    key: 'time',
    render: (title, info) => {
        return title && moment(title, 'HH:mm').format('LT');
    }
},
{
    title: <FormattedMessage {...messages.email} />,
    dataIndex: 'sendEmail',
    key: 'email',
    align:'center',
    render : (checked) => checked && <Icon type="check" theme="outlined" />
},
{
    title: <FormattedMessage {...messages.notification} />,
    dataIndex: 'sendNotification',
    key: 'notification',
    align:'center',
    render : (checked) => checked && <Icon type="check" theme="outlined" />
},
{
    title: <FormattedMessage {...messages.sms} />,
    dataIndex: 'sendSms',
    key: 'sms',
    align:'center',
    render : (checked) => checked && <Icon type="check" theme="outlined" />
},
{
    title: <FormattedMessage {...messages.mobile} />,
    dataIndex: 'sendMobile',
    key: 'mobile',
    align:'center',
    render : (checked) => checked && <Icon type="check" theme="outlined" />
}];



const RemindersList = props => {
    const { reminders = [], title='', loading=false } = props;
    return <Card title={<FormattedMessage values={{title}} {...messagesReminders.remindersTitle} />} 
    loading={loading}
    extra={<RemindersManagerButton {...props} />} 
    type="inner ant-card-type-table">
        {reminders.length > 0 ? <Table size={'small'} dataSource={reminders} columns={columns} pagination={false} /> : <EmptyList><FormattedMessage  {...messagesReminders.remindersEmpty} /></EmptyList>}
    </Card>
}

export default RemindersList;
