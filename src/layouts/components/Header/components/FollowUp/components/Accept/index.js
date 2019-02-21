import React from 'react';
import {Button, Tooltip} from 'antd';

const FollowUpAccept = props => {
    // const {showModal, toggleModal} = props;
    return <Tooltip title={'Done'}><Button type={'primary'} icon={'check'} size={'small'} onClick={props.onSubmit} /></Tooltip>;
}

export default FollowUpAccept;