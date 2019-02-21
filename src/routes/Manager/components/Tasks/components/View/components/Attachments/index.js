import React from 'react';
import {TaskAttachmentItem} from './containers/Item';
import { ListWithMessage } from '../../../../../../../../components/UI/List';
import { Card } from 'antd';

const TaskAttachments = props => {
    const {task, patient} = props;
    console.log(props);
    const {getAttachments:items=[]} = task || {};
    return <Card>
        <ListWithMessage
    emptyMessage={false}
    itemLayout="horizontal"
    pagination={{
      pageSize: 5,
      hideOnSinglePage:true
    }}
    size={'small'}
    dataSource={items}
    renderItem={(attachment, i) => {
        return <TaskAttachmentItem  key={i} attachment={attachment} patient={patient} task={task} />
    }} 
    />
    </Card>
}

export default TaskAttachments;