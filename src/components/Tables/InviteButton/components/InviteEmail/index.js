import React from 'react';
import {Card,Row,Col,Button,Select,Form,Divider,Radio,DatePicker,TimePicker, Input} from 'antd';
import InviteEmail from './InviteEmailForm/containers/inviteEmail';
const InviteEmailButton = props => {
    const {visibleModal=false,openModal,hideModal,selectedObj} =props;
    return  (<React.Fragment><Button type="primary" onClick={openModal} >Email</Button>
     {visibleModal && <InviteEmail selectedObj={selectedObj} onHide={hideModal} />}</React.Fragment>)
    
}

export default InviteEmailButton;