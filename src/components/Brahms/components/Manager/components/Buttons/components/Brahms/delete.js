import React from 'react';
import { Icon, Popconfirm } from 'antd';
import { withHandlers } from 'recompose';

const BrahmsRuleDeleteButtonPure = props => {
    return <Popconfirm title={"Delete?"} onConfirm={props.onDelete} okText="Yes" cancelText="No">
    {props.asMenuItem ? <a>Delete</a> : <Icon type="close-circle" theme="outlined" />}
</Popconfirm>
}

export const BrahmsRuleDeleteButton = withHandlers({
    onDelete: props => (value) => {
        const {onDelete, rule, ruleIndex} = props;
        if (onDelete) {
            onDelete(rule, ruleIndex);
        }
    }
})(BrahmsRuleDeleteButtonPure);