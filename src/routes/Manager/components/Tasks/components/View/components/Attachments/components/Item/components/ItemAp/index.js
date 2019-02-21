import React from 'react';
import { List, Avatar } from 'antd';
import { AcceptPlanButton } from '../../../../../../../../../../../Plan/components/AcceptPlan/components/AcceptPlanButton';


const AttachmentItemAp = props => {
    console.log(props);
    const {attachment, patient, task} = props;
    const {isParticipant} = task || {};
    const {object} = attachment || {};
    const {thumb, title, typeTxt} = object || {};
    const {medium=''} = thumb || {};
    let actions = [];
    if (isParticipant) {
      //actions.push(<AcceptPlanButton plan={object} patient={patient} />);
    }
    return <List.Item actions={actions}><List.Item.Meta
    avatar={<Avatar shape="square" src={medium} />}
    title={title}
    description={typeTxt}
  /></List.Item>
}

export default AttachmentItemAp;