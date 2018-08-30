import React from 'react';
import {Button, Tooltip} from 'antd';
import FollowUp from '../../containers/FollowUp';
const FollowUpButton = props => {
    const {showModal, toggleModal, ...otherProps} = props;
    return <React.Fragment>
        {showModal && <FollowUp {...otherProps} asModal onHide={toggleModal} />}
        <Tooltip title={'Follow Up'}><Button   icon={'schedule'} onClick={toggleModal} ></Button></Tooltip>
    </React.Fragment>
}

export default FollowUpButton;