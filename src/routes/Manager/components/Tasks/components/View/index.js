import React from 'react';
import { Card, Tabs, Divider } from 'antd';
import TaskHistory from './components/History';
import TaskDetails from './components/Details';
import TaskAttachments from './components/Attachments';
import UserWidgetCard from '../../../../../../components/User/components/WidgetCard';
import { Comments } from '../../../../../../components/Comments';
import { withActiveUserSimple } from '../../../../../../components/App/app-context';
import { DrawerFooter } from '../../../../../../components/Modal';
import { TaskManagerButton } from '../Manager/components/Button';
import { TaskUpdateStatusButton } from './components/Buttons/containers/TaskUpdateStatusButton';
import { TaskForwardButton } from './components/ForwardButton';

const TabPane = Tabs.TabPane;
const TaskView = props => {
    const {task, ...otherProps} = props;
    const {checkIfSelf} = otherProps;
    const {id, patient, isClosed, sender, isParticipant=false,  getAttachments=[]} = task;

    const isSender = checkIfSelf(sender);
    const isManager = isParticipant || isSender;

    return <React.Fragment>
        {patient && <UserWidgetCard user={patient} />}
        <Tabs defaultActiveKey="1" >
            <TabPane tab="Details" key="1"><TaskDetails task={task} {...otherProps} /></TabPane>
            {getAttachments.length > 0 &&  <TabPane tab={'Attachments ('+getAttachments.length+')'} key="4"><TaskAttachments task={task} /></TabPane>}
            <TabPane tab="Notes" key="2">
                <Card><Comments id={id} type="task"  /></Card>
            </TabPane>
            <TabPane tab="History" key="3"><TaskHistory task={task} /></TabPane>
        </Tabs>

        <DrawerFooter>
        {(isManager && !isClosed) && <span style={{float:'left'}}><TaskUpdateStatusButton task={task} status={'closed'} /></span>}
        {(isManager && !isClosed) && <TaskForwardButton task={task} />}
        {(isManager && !isClosed) && <TaskManagerButton task={task} label={'Edit'} />}
        </DrawerFooter>
        
    </React.Fragment>
}

export default withActiveUserSimple(TaskView);