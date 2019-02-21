import React from 'react';
import { List, Avatar } from 'antd';
import moment from 'moment';

const AttachmentItemUp = props => {
  console.log(props);
    const {attachment} = props;
    const {object} = attachment || {};
    const {plan} = object || {};
    const {thumb, title} = plan || {};
    const {medium=''} = thumb || {};
    return <List.Item.Meta
    avatar={<Avatar src={medium} />}
    title={title}
    description={"Since "+moment().format('l')}
  />
}

export default AttachmentItemUp;