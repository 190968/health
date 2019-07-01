import React from 'react';
import { List, Avatar, Tag } from 'antd';
import moment from 'moment';
import { formatSchedule } from '../../../../../../../../utils/datetime';

const AttachmentItemAssessment = props => {
    const {attachment} = props;
    // console.log(props);
    const {object} = attachment || {};
    const {name, schedule} = object || {};
    // const {startDate, endDate} = schedule || {};

    return <List.Item.Meta
     avatar={<Avatar icon={'form'} />}
    title={name}
    description={formatSchedule({schedule})}
  />
}

export default AttachmentItemAssessment;

