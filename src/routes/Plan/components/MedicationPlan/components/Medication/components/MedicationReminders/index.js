import React from 'react';
import moment from 'moment';

import { Button, Icon, Card, Modal, TimePicker, Checkbox, Form, Table } from 'antd';
import { EmptyList } from '../../../../../../../../components/Loading';
import MedicationReminderManagerButton from './components/MedicationReminderManager/components/MedicationReminderManagerButton';




const columns = [{
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    render: (title, info) => {
        console.log(info);
        return title && moment(title, 'HH:mm').format('LT');
    }
},
{
    title: 'Email',
    dataIndex: 'sendEmail',
    key: 'email',
    render : (checked) => checked && <Icon type="check" theme="outlined" />
},
{
    title: 'Notification',
    dataIndex: 'sendNotification',
    key: 'notification',
    render : (checked) => checked && <Icon type="check" theme="outlined" />
},
{
    title: 'Sms',
    dataIndex: 'sendSms',
    key: 'sms',
    render : (checked) => checked && <Icon type="check" theme="outlined" />
},
{
    title: 'Mobile',
    dataIndex: 'sendMobile',
    key: 'mobile',
    render : (checked) => checked && <Icon type="check" theme="outlined" />
}];



const MedicationReminders = props => {
    const { medication, reminders = [] } = props;
    console.log(reminders);
    return <Card title="Medication Reminders" type={'table'} extra={<MedicationReminderManagerButton medication={medication} reminders={reminders} />} type="inner">
        {reminders.length > 0 ? <Table dataSource={reminders} columns={columns} pagination={false} /> : <EmptyList>Set up reminders here</EmptyList>}
    </Card>
}

export default MedicationReminders;

// export default class MedicationReminders extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {showAdd:false}
//         this.toggleAdd = this.toggleAdd.bind(this);
//         this.handleCreate = this.handleCreate.bind(this);
//     };

//     static propTypes = {
//         data: PropTypes.array,

//     }
//     static defaultProps = {
//         data: [],
//     }

//     toggleAdd() {
//         this.setState({showAdd:!this.state.showAdd});
//     }




//     handleCreate = () => {
//         const form = this.form;
//         form.validateFields((err) => {
//             if (err) {
//                 return;
//             }


//             // form.resetFields();
//             // hide the modal
//             this.setState({ showAdd: false });
//         });
//     }


//     render() {

//         const {data, medication} = this.props;

//         return (<Card title="Medication Reminders" extra={<MedicationReminderManagerButton medication={medication} />} type="inner">
//             {data.length > 0 ? <Table dataSource={data} columns={columns} /> : <EmptyList>Set up reminders here</EmptyList>}
//         </Card>)
//     }
// }