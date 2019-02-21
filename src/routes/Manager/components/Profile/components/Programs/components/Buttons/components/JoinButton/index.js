import React from 'react';
import {Popconfirm, Button} from 'antd';

const ProgramJoinButton = props => {
    const {unjoin} = props
    if (unjoin) {
        return <Popconfirm title={'Are you sure you want to remove Referral'} onConfirm={props.unjoinProgram} okText="Yes" cancelText="No">
        <Button type={'danger'} >Remove Referral</Button>
        </Popconfirm>
    }
	return <Button type={'primary'} onClick={props.joinProgram}>Send Referral</Button>;
}

export default ProgramJoinButton;