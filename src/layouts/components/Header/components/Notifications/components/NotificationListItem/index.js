import React from 'react';
import { List, Row, Col, Popconfirm, Button, Tooltip } from 'antd';
import moment from 'moment';
import Avatar from '../../../../../../../routes/User/components/Avatar';
const ButtonGroup = Button.Group;
const NotificationListItem = props => {
    const { notification: message, onAccept, onDecline } = props;
    const { isRequest, isCritical } = message;
    const canReport = true;

    let actions = null;

    if (canReport) {
        if (isRequest) {
            actions = <Col xs={12}><Popconfirm title="Are you sure decline this request?" getPopupContainer={triggerNode => triggerNode.parentNode}
                    onConfirm={onDecline}
                ><Button size='small' type="dashed" >Decline</Button></Popconfirm> <Button size='small' type="primary" ghost onClick={onAccept}>Approve</Button></Col>
        } else if (isCritical) {
            actions = <ButtonGroup>
                <Tooltip title={'Claim'}><Button size='small' type="primary" ghost onClick={onAccept}>Claim</Button></Tooltip>
                <Tooltip title={'Assign'}><Button size='small' disabled  icon="user-add" /></Tooltip>
                {/* <Button size='small' onClick={onAccept}>Mark Unread</Button> */}
                </ButtonGroup>;
        } else {
            actions = <Button size='small' type="primary"  ghost onClick={onAccept}>Ok</Button>;
        }
    }
    return <List.Item key={message.id} >
        <List.Item.Meta
            avatar={<Avatar info={message.sender} />}
            title={message.text}
            description={<Row type="flex" justify="space-between" >
                <Col xs={12}>{moment(message.dateSent).calendar()}</Col>
                {actions}
            </Row>}
        />
    </List.Item>;
}

export default NotificationListItem;