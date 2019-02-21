import React from 'react';
import { compose, branch, renderComponent } from 'recompose';
import AttachmentItemAp from './components/ItemAp';
import AttachmentItemUp from './components/ItemUp';
import AttachmentItemAssessment from './components/ItemAssessment';
import AttachmentItemUserAssessment from './components/ItemAssessment/user';
import { List } from 'antd';

const TaskInnerPure = props => {
    return null;
}

const enhance = compose(
  branch(props => props.attachment.type === 'ap', renderComponent(AttachmentItemAp)),
  branch(props => props.attachment.type === 'up', renderComponent(AttachmentItemUp)),
  branch(props => props.attachment.type === 'assessment', renderComponent(AttachmentItemAssessment)),
  branch(props => props.attachment.type === 'userAssessment', renderComponent(AttachmentItemUserAssessment))
);

const TaskAttachmentItem = enhance(TaskInnerPure);

// const TaskAttachmentItem = props => {
//     const {task} = props;
//     const {isParticipant} = task || {};
//     let actions = [];
//     // if (isParticipant) {
//     //   actions.push(<AttachmentItemButtons {...props} />);
//     }
//     return <TaskInner {...props} />
// }

export default TaskAttachmentItem;
