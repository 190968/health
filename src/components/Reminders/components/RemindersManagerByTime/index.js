import React from 'react';
import {Card, Table, Checkbox, Button} from 'antd';
import moment from 'moment';
import { TimeField } from '../../../FormCustomFields';
import {ReminderDeleteButton} from '../../containers/ReminderDeleteButton';
import { EmptyList } from '../../../Loading';
import { FormattedMessage } from 'react-intl';
import messages from '../../i18n/en';
import DefaultI18nEn from '../../../../i18n/en';

const RemindersManagerByTime = props => {
	const { form, reminders, editableTime=true, loading=false } = props;
	const { getFieldDecorator } = form;


	const columnsAlong = [
		{
			title: <FormattedMessage id={'time'} defaultMessage={"Time"} />,
			dataIndex: 'time',
			key: 'time',
			render: (title, info) => {
                const {i} = info;
                // console.log(title);
                // console.log(moment(title, 'HH:mm'));
                if (editableTime) {
                   
                    return getFieldDecorator('reminders['+i+'][time]', {
                        initialValue: title && moment(title, 'HH:mm'),
                        rules: [{ required: true, message:<FormattedMessage id={'select.time'} defaultMessage={"Select Time"} />}],
                    })(<TimeField minuteStep={30} use12Hours={true} />);
                } else {
                    return title && moment(title, 'HH:mm').format('LT');
                }
			}
		},
		{
			title: <FormattedMessage id={'email'} defaultMessage={"Email"} />,
			dataIndex: 'sendEmail',
			key: 'email',
			render: (title, info) => {
                const {i} = info;
				return getFieldDecorator('reminders['+i+'][email]', {
                    initialValue: title,
                    valuePropName: 'checked'
                })(<Checkbox />);
			}
		},
		{
			title: <FormattedMessage id={'notification'} defaultMessage={"Notification"} />,
			dataIndex: 'sendNotification',
			key: 'notification',
			render: (title, info) => {
                const {i} = info;
                // console.log(title);
                return getFieldDecorator('reminders['+i+'][notification]', {
                    initialValue: title,
                    valuePropName: 'checked'
                })(<Checkbox />);
			}
		},
		{
			title: <FormattedMessage id={'sms'} defaultMessage={"Sms"} />,
			dataIndex: 'sendSms',
			key: 'sms',
			render: (title, info) => {
                const {i} = info;
                return getFieldDecorator('reminders['+i+'][sms]', {
                    initialValue: title,
                    valuePropName: 'checked'
                })(<Checkbox />);
			}
        },
        {
			title: <FormattedMessage id={'mobile'} defaultMessage={"Mobile"} />,
			dataIndex: 'sendMobile',
			key: 'mobile',
			render: (title, info) => {
                const {i} = info;
                return getFieldDecorator('reminders['+i+'][mobile]', {
                    initialValue: title,
                    valuePropName: 'checked'
                })(<Checkbox />);
			}
        }
    ];
    
    if (editableTime) {
        columnsAlong.push({
            title: '',
            key: 'action',
            render: (text, record) => (
              <span>
                <ReminderDeleteButton reminder={record} onDelete={props.deleteReminder} />
              </span>
            ),
          });
    }
    reminders.map((reminder, i) => {
        const {id, time} = reminder;
        getFieldDecorator('reminders['+i+'][id]', {
            initialValue: id,
        });
        if (!editableTime) {
            {getFieldDecorator('reminders['+i+'][time]', {
                initialValue: time && moment(time, 'HH:mm'),
            })}
        }
    });

    const emptyText = <FormattedMessage values={{editableTime}} {...messages.noReminders} />;
	return (
		<Card
        type={'table'}
        loading={loading}
		>
            {reminders.length > 0 ? <Table dataSource={reminders} rowKey={'i'} columns={columnsAlong} pagination={false} /> : <EmptyList>{emptyText}</EmptyList>}
            {editableTime && <div style={{margin:'10px', textAlign: 'center'}}><Button type={'primary'}   ghost onClick={props.handleAddLine} ><FormattedMessage values={{title: <FormattedMessage {...messages.reminder} />}} {...DefaultI18nEn.newSomething} /></Button></div>}
		</Card>
	);
}

export default RemindersManagerByTime;