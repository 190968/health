import React from 'react';
import { Icon, Tabs, Input, Col, Select, Form, DatePicker, Button, } from 'antd';
import { compose, withState, withHandlers } from 'recompose';

import PatientInvite from "../../containers/PatientInvite";

const PatientEditButton = props => {
    const { openModal,visibleModal,hideModal,user } = props;
    console.log("PatientEditButton ==> ",user);
    return <React.Fragment >
        <Button onClick={openModal}><Icon type="edit" /> Edit</Button>
        {visibleModal && <PatientInvite onHide={hideModal} patients={user} />}
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