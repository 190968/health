import React from 'react';
import {Tooltip, Button, Icon,} from 'antd';
import StaffMemberInvite from '../../containers/StaffMemberInvite';


const StaffMemberInviteButton = ({showModal, toggleModal, role}) => {

    return <React.Fragment>
        {showModal && <StaffMemberInvite role={role} onHide={toggleModal} />}
            <Tooltip title="Invite"><Button onClick={toggleModal} type="primary"><Icon type="plus"/></Button></Tooltip>
        </React.Fragment>;
}

export default StaffMemberInviteButton;