import React from 'react';
import { Icon  , Button } from 'antd';
import {ChangeUserPasswordModal} from '../PatientEditForms/containers/ChangeUserPasswordModal';
import { withToggleModal } from '../../../../../../components/Modal';

const PatientEditButton = props => {
    const { showModal,toggleModal, user, asMenuItem=false } = props;
    console.log(props);
    return <React.Fragment >

        {asMenuItem ? <span onClick={toggleModal}>Change Password</span> : <Button onClick={toggleModal}><Icon type="edit" /> Edit</Button>}
        
        {showModal && <ChangeUserPasswordModal onHide={toggleModal} user={user} />}
      </React.Fragment>
}
 
export const PatientPasswordButton = withToggleModal(PatientEditButton);
export default PatientPasswordButton;