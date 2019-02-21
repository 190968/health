import React from 'react';
import {Popconfirm, Icon} from 'antd';

const DeleteButton = props => {
    return <Popconfirm title={'Are you sure you want to delete this record'} onConfirm={props.handleDelete} okText="Yes" cancelText="No">
        <Icon type="close-circle" theme="outlined" />
  </Popconfirm>
}

export default DeleteButton;