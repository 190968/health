import React from 'react';
import {Popconfirm, Icon} from 'antd';

const FamilyMemberDeleteButton = props => {
    const {asMenuItem} = props;
    return <Popconfirm title={'Are you sure you want to delete this Family Member'} onConfirm={props.handleDelete} okText="Yes" cancelText="No" placement="topRight">
        {asMenuItem ? <span>Delete</span> : <Icon type="close-circle" theme="outlined" />}
  </Popconfirm>
}

export default FamilyMemberDeleteButton;