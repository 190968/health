import React from 'react';
import { List, Avatar, Button } from 'antd';
import { AttachmentItemButtons } from '../../containers/AttachmentItemButtons';
const ButtonGroup = Button.Group;

const AttachmentItemAssessment = props => {
  console.log(props);
    const {attachment, patient, task} = props;
    const {isParticipant, isClosed} = task || {};
    const {object} = attachment || {};
    const {assessment} = object || {};
    const {name} = assessment || {};

    let actions = [];
    if (!isClosed && isParticipant) {
      actions.push(<AttachmentItemButtons attachment={attachment} />);
    }

    return <List.Item actions={actions}><List.Item.Meta
     avatar={<Avatar icon={'form'} />}
    title={name}
    description="Assessment"
  /></List.Item>
}

export default AttachmentItemAssessment;