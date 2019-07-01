import React from 'react';
import { List, Icon, Popconfirm } from 'antd';
import { compose, branch, renderComponent, renderNothing } from 'recompose';
import AttachmentItemAp from './components/ItemAp';
import AttachmentItemUp from './components/ItemUp';
import AttachmentItemAssessment from './components/ItemAssessment';
import AttachmentItemUserAssessment from './components/ItemAssessment/user.js';
import AttachmentItemMedication from './components/ItemMedication';
import AttachmentItemTracker from './components/ItemTracker';
import AttachmentItemDME from './components/ItemDME';
import AttachmentModuleButton from '../Button';


const TaskInnerPure = null;

const enhance = compose(
  branch(props => props.attachment.type === 'ap', renderComponent(AttachmentItemAp)),
  branch(props => props.attachment.type === 'up', renderComponent(AttachmentItemUp)),
  branch(props => props.attachment.type === 'assessment', renderComponent(AttachmentItemAssessment)),
  branch(props => props.attachment.type === 'userAssessment', renderComponent(AttachmentItemUserAssessment)),
  branch(props => props.attachment.type === 'medication', renderComponent(AttachmentItemMedication)),
  branch(props => props.attachment.type === 'tracker', renderComponent(AttachmentItemTracker)),
  branch(props => props.attachment.type === 'dme', renderComponent(AttachmentItemDME)),
  renderNothing
);

const TaskInner = enhance(TaskInnerPure);

const TaskManagerAttachmentItem = props => {
    
  let actions =  [];
  const {attachment, updateAttachment, editable, attachmentLabel='attachment', i, ...otherProps} = props;
  const {id, type} = attachment || {};
  // can remove only upon creation
  if (!id && props.onDelete) {
    actions.push(<Popconfirm title={"Are you sure you want to delete this "+attachmentLabel+" ?"} onConfirm={props.onDelete} okText="Yes" cancelText="No"><Icon type="close-circle" theme="outlined" /></Popconfirm>);
  } 
  if (editable) {
    actions.push(<AttachmentModuleButton type={type} i={i} {...otherProps} icon={'edit'} button={false} attachment={attachment} updateAttachment={updateAttachment} />);
  }

  return <List.Item actions={actions} >
      <TaskInner {...props} />
  </List.Item>
}

export default TaskManagerAttachmentItem;