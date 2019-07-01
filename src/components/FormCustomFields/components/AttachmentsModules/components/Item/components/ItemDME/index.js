import React from 'react';
import { List, Avatar } from 'antd';
import { formatDMEItem } from '../../../../../../../DME/components/Manager/components/EquipmentList/components/Item';

const AttachmentItemDME = props => {
    const {attachment} = props;
    // console.log(props, 'DME Props');
    const {object} = attachment || {};
    const {source, equipments=[], serviceDate} = object || {};
    // const {startDate, endDate} = schedule || {};
  const items = equipments.map((e, i) => <div key={i}>{formatDMEItem(e)}</div>);
    return <List.Item.Meta
      avatar={<Avatar icon={'robot'} />}
      title={'DME'}
      description={items}
  />
}

export default AttachmentItemDME;

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