import React from 'react';
import {Card,Row,Col,Button,Select,Form,Divider,Radio,DatePicker,TimePicker, Input} from 'antd';
import InviteSMS from './InviteSMSForm/containers/inviteSMS';
const InviteSMSButton = props => {
    
    const {visibleModal=false,openModal,hideModal,selectedObj} = props;
    return  (<React.Fragment><Button type="primary" onClick={openModal} >SMS</Button>
     {visibleModal && <InviteSMS selectedObj={selectedObj}  onHide={hideModal} />}</React.Fragment>)
    
}

export default InviteSMSButton;