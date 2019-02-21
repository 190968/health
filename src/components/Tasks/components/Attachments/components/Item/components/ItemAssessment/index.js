import React from 'react';
import { List, Avatar } from 'antd';
import moment from 'moment';

const AttachmentItemAssessment = props => {
    const {attachment} = props;
    console.log(props);
    const {object} = attachment || {};
    const {name, schedule} = object || {};
    const {startDate, endDate} = schedule || {};

    return <List.Item.Meta
     avatar={<Avatar icon={'form'} />}
    title={name}
    description={formatSchedule({schedule})}
  />
}

export default AttachmentItemAssessment;

const formatSchedule = props => {
  const {schedule} = props || {};
  const {startDate, endDate} = schedule || {};
  let text = '';
  if (startDate && endDate) {
    text = 'Between '+moment(startDate).format('l')+' and '+moment(endDate).format('l')
  } else if (startDate) {
    text = 'From '+moment(startDate).format('l');
  } else if (endDate) {
    text = 'Until '+moment(endDate).format('l');
  }

  return text;
}