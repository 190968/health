import React from 'react';
import {Button, Tooltip} from 'antd';
import FollowUp from '../../containers/FollowUp';
const FollowUpButton = props => {
    const {showModal, size, icon='schedule', toggleModal, ...otherProps} = props;
    return <React.Fragment>
        {showModal && <FollowUp {...otherProps} asModal onHide={toggleModal} />}
        <Tooltip title={'Follow Up'}><Button size={size}  icon={icon} onClick={toggleModal}  /></Tooltip>
    </React.Fragment>
}

export default FollowUpButton;