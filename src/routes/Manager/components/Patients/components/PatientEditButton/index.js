import React from 'react';
import { Icon, Tabs, Input, Col, Select, Form, DatePicker, Button, } from 'antd';
import { compose, withState, withHandlers } from 'recompose';

import PatientInvite from "../../containers/PatientInvite";

const PatientEditButton = props => {
    const { openModal,visibleModal,hideModal,user, asMenuItem=false } = props;
    console.log("PatientEditButton ==> ",props);
    return <React.Fragment >

        {asMenuItem ? <span onClick={openModal}>Edit</span> : <Button onClick={openModal}><Icon type="edit" /> Edit</Button>}
        
        {visibleModal && <PatientInvite onHide={hideModal} patient={user} />}
      </React.Fragment>
}
const enhance = compose(
    withState('visibleModal', 'setOpenManager', false),
    withHandlers({
        openModal: props => () => {
            props.setOpenManager(true);
        },
        hideModal: props => () => {
            props.setOpenManager(false);
        }
    }),
);
export default enhance(PatientEditButton);