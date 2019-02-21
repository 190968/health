import React from 'react';
import moment from 'moment';
import { List} from 'antd';
import { withToggleModal } from '../../../Modal';
import { TaskView } from '../../../../routes/Manager/components/Tasks/containers/View';
import Avatar from '../../../../routes/User/components/Avatar';


export const TaskListItem = props => {
    const { showModal, toggleModal, ...otherProps } = props;
    const {task} = otherProps;
    const {endDate} = task || {};
        return <List.Item key={task.id} >
        {showModal && <TaskView {...otherProps} onHide={toggleModal} />}
        <List.Item.Meta
            avatar={<Avatar info={task.patient} />}
            title={task.title}
            description={moment(endDate).format('lll')}
            onClick={toggleModal}
        />
    </List.Item>;
}

export default withToggleModal(TaskListItem);