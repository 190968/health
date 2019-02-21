import React from 'react';
import { List, Avatar } from 'antd';
import moment from 'moment';

const AttachmentItemAp = props => {
  console.log(props);
    const {attachment} = props;
    const {object:plan} = attachment || {};
    const {thumb, title, schedule} = plan || {};
    const {medium=''} = thumb || {};
    const {startDate, endDate} = schedule;

    return <List.Item.Meta
    avatar={<Avatar src={medium} />}
    title={title}
    description={"Since "+moment(startDate).format('l')}
  />
}

export default AttachmentItemAp;