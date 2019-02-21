import { Card, Table } from 'antd';
import React from 'react';
import AvatarWithName from '../../../../../../../User/components/AvatarWithName';
import moment from 'moment';

const columns = [{
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: date=> moment(date).format('lll')
  }, {
    title: 'By',
    dataIndex: 'user',
    key: 'user',
    render: user => <AvatarWithName user={user} />
  }, {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  }];

const TaskHistory = props => {
    const {task} = props;
    const {getHistory} = task || {};
    const {edges=[]} = getHistory || {};
    return <Card  type={'table'}>
    <Table dataSource={edges} columns={columns} pagination={false} />
    </Card>
}

export default TaskHistory;