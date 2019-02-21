import React from 'react';
import { List, Avatar } from 'antd';
import moment from 'moment';

const AttachmentItemAssessment = props => {
    const {attachment} = props;
    console.log(props);
    const {object} = attachment || {};
    const {assessment, startDate, endDate} = object || {};
    const {name, schedule} = assessment || {};

    return <List.Item.Meta
     avatar={<Avatar icon={'form'} />}
    title={name}
    description={"Since "+moment(startDate).format('l')}
  />
}

export default AttachmentItemAssessment;