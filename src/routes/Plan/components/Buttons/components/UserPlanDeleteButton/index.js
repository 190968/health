import React from 'react';
import {Popconfirm, Icon} from 'antd';

const UserPlanDeleteButton = props => {
    const {asMenuItem} = props;
    return <Popconfirm title={'Are you sure you want to delete this Plan'} onConfirm={props.handleDelete} okText="Yes" cancelText="No">
        {asMenuItem ? <span>Delete</span> : <Icon type="close-circle" theme="outlined" />}
  </Popconfirm>
}

export default UserPlanDeleteButton;