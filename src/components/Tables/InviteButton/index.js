import React from 'react';
import {Card,Row,Col,Button,Select,Form,Divider,Radio,DatePicker,TimePicker, Input} from 'antd';
import InviteEmail from './containers/InviteEmail';
import InviteSMS from './containers/InviteSMS';
import InviteMeeting from './containers/InviteMeeting';
const InviteButton = props => {
  const {selectedCount,selectedObj} = props;
    return  (<div style={{padding:'20px 30px'}}><Row>
    <Col sm={12}><p>{selectedCount} Selected</p></Col>
    <Col sm={12} style={{textAlign:'right'}}><InviteMeeting selectedObj={selectedObj} /> <InviteEmail selectedObj={selectedObj} /> <InviteSMS /></Col>
    </Row></div>)
}

export default InviteButton;