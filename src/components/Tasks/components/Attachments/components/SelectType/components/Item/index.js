import React from 'react';
import {  Card } from 'antd';

const TaskManagerAttachmentTypeSelectItem = props => {
    const { onSelect, label } = props;
    return <Card.Grid onClick={onSelect} style={{width: '100%', cursor:'pointer'}}>
    {label}
    </Card.Grid>;
}

export default TaskManagerAttachmentTypeSelectItem;