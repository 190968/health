import React from 'react';
import { List, Avatar } from 'antd';
import moment from 'moment';
import { formatSchedule } from '../../../../../../../../utils/datetime';
import { IconCustom } from '../../../../../../../FitIcon';

const AttachmentItemTracker = props => {
    const {attachment} = props;
    const {object} = attachment || {};
    const {measurement, timesToReport, startDate, endDate} = object || {};
    const {label} = measurement || {};
    // const {startDate, endDate} = schedule || {};

    return <List.Item.Meta
     avatar={<span className={'ant-avatar ant-avatar-circle ant-avatar-icon'} ><IconCustom color={'#fff'} type="tracker"/></span>}
    title={label}
    description={<>{formatSchedule({schedule:{startDate, endDate}})} Times: {timesToReport}</>}
  />
}

export default AttachmentItemTracker;

// const formatSchedule = props => {
//   const {schedule} = props || {};
//   const {startDate, endDate} = schedule || {};
//   let text = '';
//   if (startDate && endDate) {
//     text = 'Between '+moment(startDate).format('l')+' and '+moment(endDate).format('l')
//   } else if (startDate) {
//     text = 'From '+moment(startDate).format('l');
//   } else if (endDate) {
//     text = 'Until '+moment(endDate).format('l');
//   }

//   return text;
// }