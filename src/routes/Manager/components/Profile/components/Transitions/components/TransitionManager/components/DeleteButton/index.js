import React from 'react';
import {Popconfirm, Icon} from 'antd';

const TransitionDeleteButton = props => {
    const {asMenuItem} = props;
    return <Popconfirm title={'Are you sure you want to delete this Transition'} onConfirm={props.handleDelete} okText="Yes" cancelText="No" placement="topRight">
        {asMenuItem ? <span>Delete</span> : <Icon type="close-circle" theme="outlined" />}
  </Popconfirm>
}

export default TransitionDeleteButton;