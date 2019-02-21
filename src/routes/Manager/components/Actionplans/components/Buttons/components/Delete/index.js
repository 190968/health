import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Popconfirm, Icon } from 'antd';

const ActionplansDeleteButton = props => {
    return <Popconfirm title={"Delete?"} onConfirm={props.handleDelete} okText="Yes" cancelText="No">
    {props.asMenuItem ? <span>Delete</span> : <Icon type="close-circle" theme="outlined" />}
</Popconfirm>
}

export default ActionplansDeleteButton;