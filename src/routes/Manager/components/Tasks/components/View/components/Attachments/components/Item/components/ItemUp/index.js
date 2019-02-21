import React from 'react';
import { List, Avatar } from 'antd';
import { AcceptUserPlanButton } from '../../../../../../../../../../../Plan/components/AcceptPlan/components/AcceptUserPlanButton';


const AttachmentItemUp = props => {
    const {attachment, patient} = props;
    const {object} = attachment || {};
    const {plan} = object || {};
    const {thumb, title, typeTxt} = plan || {};
    const {medium=''} = thumb || {};

    const {task} = props;
    const {isParticipant} = task || {};
    let actions = [];
    if (isParticipant) {
      actions.push(<AcceptUserPlanButton userPlan={object} patient={patient} />);
    }

    return <List.Item  actions={actions} >
    <List.Item.Meta
    avatar={<Avatar shape="square" src={medium} />}
    title={title}
    description={typeTxt}
  /></List.Item>
}

export default AttachmentItemUp;