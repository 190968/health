import React from 'react';
import { Button, Icon, Tooltip } from 'antd';
const ButtonGroup = Button.Group;

const AttachmentItemButtons = props => {
    const {attachment} = props;
    const {attachmentStatus} = attachment || {};
    if (attachmentStatus==='approved') {
        return <Button disabled>Approved</Button>;
    }
    return <ButtonGroup>
        {/* <Tooltip title={'Approve'}><Icon type="check-circle" theme="outlined" onClick={process.doApprove} style={{color: '#52c41a'}} /></Tooltip> */}
        <Tooltip title={'Approve'}><Button onClick={props.doApprove} >Approve</Button></Tooltip>
    {/* <Button type={'primary'} ghost onClick={process.doApprove}>Approve</Button> */}
    {/* <Popconfirm title="Are you sure you want to decline this task?" onConfirm={props.doDecline}>
        <Button type="danger" ghost  >Decline</Button>
    </Popconfirm> */}
  </ButtonGroup>
}

export default AttachmentItemButtons;