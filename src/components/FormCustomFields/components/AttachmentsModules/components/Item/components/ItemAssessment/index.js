import React from 'react';
import { List, Avatar, Tag } from 'antd';
import moment from 'moment';

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


const formatSchedule = props => {
  const {schedule} = props || {};
  const {startDate, endDate, startTime, dows} = schedule || {};
  // console.log(schedule, 'schedule');
  let text = '';
  if (dows && dows.length > 0) {
    text = 'Every '+dows.map(dow => dow)+' ';
  }
  if (startDate && endDate) {
    text += 'Between '+moment(startDate).format('l')+' and '+moment(endDate).format('l')
  } else if (startDate) {
    text += 'From '+moment(startDate).format('l');
  } else if (endDate) {
    text += 'Until '+moment(endDate).format('l');
  }
 
  // console.log(startTime);
  if (startTime) {
    text += ' @'+ moment(startTime, 'HH:mm').format('LT');
  }

  return text;
}