import React from 'react';
import {  Card, Icon } from 'antd';
import { SelectFromList } from '../../../../../UI/SelectFromList';
import { IconCustom } from '../../../../../FitIcon';


const getItemsFromTemplate = template => {
    let items = [];
    if (template === 'discharge') {
        items = [
            {id: 'ap', label: 'ActionPlan', icon:<IconCustom type='actionplan' />},
            {id: 'assessment', label: 'Assessment', icon:<IconCustom type='assessment' />},
            {id: 'chklist', label: 'Checklist', icon:<IconCustom type="to-do"/>},
            {id: 'medication', label: 'Medication', icon:<Icon type="medicine-box" />},
            {id: 'tracker', label: 'Tracker', icon:<IconCustom type="tracker"/>},
            {id: 'dme', label: 'DME', icon: <Icon type="robot" />},
        ];
    } else {
        items = [
            {id: 'ap', label: 'ActionPlan', icon:<IconCustom type='actionplan' />},
            {id: 'assessment', label: 'Assessment', icon:<IconCustom type='assessment' />},
            {id: 'chklist', label: 'Checklist', icon:<IconCustom type="to-do"/>},
            {id: 'medication', label: 'Medication', icon:<Icon type="medicine-box" />},
            {id: 'tracker', label: 'Tracker', icon:<IconCustom type="tracker"/>},
            // {id: 'dme', label: 'DME'},
        ];
    }
    return items;
}

const TaskManagerAttachmentTypeSelect = props => {
    const { showModal, toggleModal, template} = props;
    const items = getItemsFromTemplate(template);
    return <Card type={'pure'} bordered={false}>
        <SelectFromList cols={2} inline items={items} onSelect={props.setType} />
    </Card>
}

export default TaskManagerAttachmentTypeSelect;