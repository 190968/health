import React from 'react';
import { Card, Tabs, Button } from 'antd';
import DescriptionList from '../../../../../../../../components/Layout/DescriptionList';
import moment from 'moment';
import AvatarWithName from '../../../../../../../User/components/AvatarWithName';
import { TaskForwardButton } from '../ForwardButton';
import { TaskManagerButton } from '../../../Manager/components/Button';
import { TaskUpdateStatusButton } from '../Buttons/containers/TaskUpdateStatusButton';
const TabPane = Tabs.TabPane;

const TaskDetails = props => {
    const {task, checkIfSelf} = props;
    const {title, participants, isParticipant=false, recipient, sender, guidelines, createdOn,source,isClosed,priority, status, endDate} = task || {};
    const isSender = checkIfSelf(sender);
    const isManager = isParticipant || isSender;
    //const isClosed = status === 'closed';
    let details = [
        ['Task',<React.Fragment>
            {title}
            {/* {(isManager && !isClosed) && <span style={{float: 'right'}}><TaskManagerButton task={task} /></span>} */}
        </React.Fragment>],
        ['Status',<React.Fragment>
        {status}
        {/* {(isManager && !isClosed) && <span style={{float: 'right'}}><TaskUpdateStatusButton task={task} status={'closed'} /></span>} */}
        {/* <span style={{float: 'right'}}><TaskManagerButton task={task} /></span> */}
    </React.Fragment>],
        ['Created on', moment(createdOn).format('lll')],
        // ['Assigned To', recipient && <React.Fragment>
        //     <AvatarWithName user={recipient} /> <TaskForwardButton task={task} />
        //     </React.Fragment>],
        ['Due Date', endDate ? moment(endDate).format('lll') : null],
        ['Priority', priority],
        //['Notify list', ],
        ['Guideline', guidelines],
        ['Sender', <AvatarWithName user={sender} />],
        ['Assigned To', participants.length > 0 && <React.Fragment>
             {/* <span style={{float: 'right'}}><TaskForwardButton task={task} /></span> */}
        {participants.map(participant => <div key={participant.id} className={'detail-line'}><AvatarWithName user={participant} /></div>)}
       
        </React.Fragment>, true],
        // ['Attachment', genderText],
        
        ['Source', source],
        
    ]

    return <Card >
        <DescriptionList details={details} col={1} />
    </Card>
}

export default TaskDetails;