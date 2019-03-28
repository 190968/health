import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Popconfirm, Icon } from 'antd';

const CancerStageDeleteButton = props => {
    return <Popconfirm title={"Delete?"} onConfirm={props.handleDelete} okText="Yes" cancelText="No">
    {props.asMenuItem ? <a>Delete</a> : <Icon type="close-circle" theme="outlined" />}
</Popconfirm>
}

export default CancerStageDeleteButton;