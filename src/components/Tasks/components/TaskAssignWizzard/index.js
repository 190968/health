import React from 'react';
import {Card, Button} from 'antd';
import { DrawerFooter } from '../../../Modal';
import TaskManagerAttachmentItem from '../../../FormCustomFields/components/AttachmentsModules/components/Item';

const TaskAssignWizzard = props => {
    const {attachments} = props;
    return <React.Fragment>
        <Card title={'Assign Preview'}>
        {attachments.map((attachment, i) => {
            return <TaskManagerAttachmentItem key={i} attachment={attachment} />;
        })}
        
        </Card>
        <DrawerFooter>
            <Button type={'primary'} onClick={props.onSubmit}>Finish</Button>
        </DrawerFooter>
    </React.Fragment>;
}

export default TaskAssignWizzard;