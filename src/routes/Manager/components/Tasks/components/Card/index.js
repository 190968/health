import React from 'react';
import moment from 'moment';
import AvatarWithName from '../../../../../User/components/AvatarWithName';
import { Card, Icon, Tooltip } from 'antd';
import { TaskView } from '../../containers/View';
import './index.less';
import Avatar from '../../../../../User/components/Avatar';
import {AvatarList} from '../../../../../../components/UI/AvatarList';

const TaskCard = props => {
    const { showModal, toggleModal, ...otherProps } = props;
    const {task} = otherProps;
    let color = '#11B76B';
    switch (task.priority) {
        case 'critical':
            color = '#ff5a5f';
            break;
        case 'high':
            color = '#FF8805';
            break;
    }
    const {isClosed, endDate, getAttachments=[], participants=[]} = task;
    return <React.Fragment>
    {showModal && <TaskView {...otherProps} onHide={toggleModal} />}
        <Card bordered={true} type={'task'+(isClosed ? ' closed' : '')}  bodyStyle={{borderLeft: '3px solid ' + color, padding: 10}} hoverable onClick={toggleModal} >
        {/* <AvatarWithName user={task.sender} size={'small'}/> */}
        <Card.Meta
            avatar={<Avatar user={task.sender} />}
            title={task.title}
            description={endDate && moment(endDate).format('L')}
            />
        <div className={'bottom-meta'}> 
            {participants.length > 0 && <div className={'participants'}>
                <AvatarList size="mini">
                {participants.map(participant => <AvatarList.Item key={participant.id} tips={participant.firstName} avatar={<Avatar user={participant} />} />)}
            </AvatarList>  
            </div>}
          
            {getAttachments.length > 0 && <div className={'attachments'}><Tooltip title={'Attachment inside'}><Icon type="paper-clip" /></Tooltip></div>}
       </div>
    </Card>

</React.Fragment>

}


export default TaskCard;