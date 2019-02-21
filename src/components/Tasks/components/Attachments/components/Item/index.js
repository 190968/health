import React from 'react';
import { List, Icon, Popconfirm } from 'antd';
import { compose, branch, renderComponent } from 'recompose';
import AttachmentItemAp from './components/ItemAp';
import AttachmentItemUp from './components/ItemUp';
import AttachmentItemAssessment from './components/ItemAssessment';
import AttachmentItemUserAssessment from './components/ItemAssessment/user.js';


const TaskInnerPure = null;

const enhance = compose(
  branch(props => props.attachment.type === 'ap', renderComponent(AttachmentItemAp)),
  branch(props => props.attachment.type === 'up', renderComponent(AttachmentItemUp)),
  branch(props => props.attachment.type === 'assessment', renderComponent(AttachmentItemAssessment)),
  branch(props => props.attachment.type === 'userAssessment', renderComponent(AttachmentItemUserAssessment))
);

const TaskInner = enhance(TaskInnerPure);

const TaskManagerAttachmentItem = props => {
    
  let actions =  [];
  const {attachment} = props;
  const {id} = attachment || {};
  // can remove only upon creation
  if (!id && props.onDelete) {
    actions.push(<Popconfirm title="Are you sure you want to delete this attachment?" onConfirm={props.onDelete}   okText="Yes" cancelText="No"><Icon type="close-circle" theme="outlined" /></Popconfirm>);
  }

  return <List.Item actions={actions} >
      <TaskInner {...props} />
  </List.Item>
}

export default TaskManagerAttachmentItem;