import React from 'react';
import { List, Avatar, Button } from 'antd';
const ButtonGroup = Button.Group;

const AttachmentItemAssessment = props => {
    const {attachment} = props;
    console.log(props);
    const {object} = attachment || {};
    const {name} = object || {};
    return <List.Item><List.Item.Meta
     avatar={<Avatar icon={'form'} />}
    title={name}
    description="Assessment"
  /></List.Item>
}

export default AttachmentItemAssessment;