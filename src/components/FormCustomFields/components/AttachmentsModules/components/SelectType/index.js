import React from 'react';
import {  Card } from 'antd';
import {TaskManagerAttachmentTypeSelectItem} from './containers/Item';

const TaskManagerAttachmentTypeSelect = props => {
    const { showModal, toggleModal,  ...otherProps } = props;
    return <Card type={'pure'} bordered={false}>
        <TaskManagerAttachmentTypeSelectItem {...otherProps}  label={'ActionPlan'} type={'ap'} />
        <TaskManagerAttachmentTypeSelectItem {...otherProps}  label={'Assessment'} type={'assessment'} />
        <TaskManagerAttachmentTypeSelectItem {...otherProps}  label={'Checklist'} type={'chklist'} />
    </Card>
}

export default TaskManagerAttachmentTypeSelect;