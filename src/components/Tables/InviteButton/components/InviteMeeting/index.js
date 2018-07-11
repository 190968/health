import React from 'react';
import {Card,Row,Col,Button,Select,Form,Divider,Radio,DatePicker,TimePicker, Input} from 'antd';
import InviteMeeting from './InviteMeetingForm/containers/inviteMeeting';
const InviteMeetingButton = props => {
    const {visibleModal=false,openModal,hideModal,selectedObj} = props;
    return  (<React.Fragment><Button type="primary" onClick={openModal} >Meeting invite</Button>
     {visibleModal && <InviteMeeting selectedObj={selectedObj} onHide={hideModal} />}</React.Fragment>)
    
}

export default InviteMeetingButton;