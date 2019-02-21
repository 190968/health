import React from 'react';
import {Popconfirm, Button} from 'antd';

const TaskUpdateStatusButton = props => {
    return <Popconfirm title={'Are you sure you want to close this task'} onConfirm={props.handleUpdate} okText="Yes" cancelText="No">
        <Button type="danger" ghost size={'small'}>Mark As Completed</Button>
  </Popconfirm>
}

export default TaskUpdateStatusButton;