import React from 'react';
import { Icon, Popconfirm } from 'antd';
import { withHandlers } from 'recompose';

const PlanElementDeleteButtonPure = props => {
    return <Popconfirm title={"Delete?"} onConfirm={props.deletePlanElement} okText="Yes" cancelText="No">
    {props.asMenuItem ? <a>Delete</a> : <Icon type="close-circle" theme="outlined" />}
</Popconfirm>
}

export default PlanElementDeleteButtonPure;
// export const PlanElementDeleteButton = withHandlers({
//     onDelete: props => (value) => {
//         const {onDelete, answerIndex} = props;
//         if (onDelete) {
//             onDelete(value, answerIndex);
//         }
//     }
// })(PlanElementDeleteButtonPure);