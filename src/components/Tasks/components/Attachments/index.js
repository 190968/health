import React from 'react';
import TaskManagerAttachmentItem from './containers/Item';
import TaskManagerAttachmentButton from './components/Button';
import { ListWithMessage } from '../../../UI/List';

const TaskManagerAttachments = props => {
    const {value:attachments=[], newAttachments=[], task, updateAttachments, deleteAttachment, date} = props;
    const items = attachments;//[...attachments, ...newAttachments];
    //console.log(items);
    return <React.Fragment><ListWithMessage
    emptyMessage={false}
    itemLayout="horizontal"
    pagination={{
      pageSize: 5,
      hideOnSinglePage:true
    }}
    size={'small'}
    dataSource={items}
    renderItem={(attachment, i) => {
        return <TaskManagerAttachmentItem  key={i} attachment={attachment} deleteAttachment={deleteAttachment} />
    }} 
    />
    <TaskManagerAttachmentButton task={task} updateAttachments={updateAttachments} date={date} />
    </React.Fragment>
}

export default TaskManagerAttachments;