import React from 'react';
import {Card,Row,Col,Button,Select,Form,Divider,Radio,DatePicker,TimePicker, Input} from 'antd';
import InviteSMS from './InviteSMSForm/containers/inviteSMS';
const InviteSMSButton = ({visibleModal=false,openModal,hideModal}) => {
    //console.log(visibleModal,openModal);
    return  (<React.Fragment><Button type="primary" onClick={openModal} >SMS</Button>
     {visibleModal && <InviteSMS onHide={hideModal} />}</React.Fragment>)
    
}

export default InviteSMSButton;