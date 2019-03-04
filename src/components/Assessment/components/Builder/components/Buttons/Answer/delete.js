import React from 'react';
import { Icon, Popconfirm } from 'antd';
import { withHandlers } from 'recompose';

const AssessmentQuestionAsnwerDeleteButtonPure = props => {
    return <Popconfirm title={"Delete?"} onConfirm={props.onDelete} okText="Yes" cancelText="No">
    {props.asMenuItem ? <a>Delete</a> : <Icon type="close-circle" theme="outlined" />}
</Popconfirm>
}

export const AssessmentQuestionAsnwerDeleteButton = withHandlers({
    onDelete: props => (value) => {
        const {onDelete, answerIndex} = props;
        if (onDelete) {
            onDelete(value, answerIndex);
        }
    }
})(AssessmentQuestionAsnwerDeleteButtonPure);