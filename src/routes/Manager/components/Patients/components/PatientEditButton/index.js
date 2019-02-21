import React from 'react';
import { Icon, Tabs, Input, Col, Select, Form, DatePicker, Button, } from 'antd';
import { compose, withState, withHandlers } from 'recompose';

import PatientManager from "../../containers/PatientManager";

const PatientEditButtonPure = props => {
    const { openModal,visibleModal,hideModal, asMenuItem=false, ...otherProps} = props;
    console.log("PatientEditButton ==> ",props);
    return <React.Fragment >

        {asMenuItem ? <span onClick={openModal}>Edit</span> : <Button onClick={openModal}><Icon type="edit" /> Edit</Button>}
        
        {visibleModal && <PatientManager onHide={hideModal}  {...otherProps} />}
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
export const PatientManagerButton =  enhance(PatientEditButtonPure);
export default PatientManagerButton;