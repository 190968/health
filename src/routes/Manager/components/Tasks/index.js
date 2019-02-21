import React from 'react';
import {Card, List} from 'antd';
import { TaskManagerButton } from './components/Manager/components/Button';
import { TaskCard } from './containers/Card';
import { CardExtraSplit } from '../../../../components/Card/components/CardExtraSplit';
import { CardQuickFilter } from '../../../../components/Card/components/CardQuickFilter';
import { withState } from 'recompose';
import messages from './i18n/en';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { ListWithMessage } from '../../../../components/UI/List';
const today = moment();

const TasksListPure  = props => {

   
    const {user, loading = false, hideOnEmpty = false} = props;
    let {tasks = []} = props;
    let total = tasks.length;
    
    if (!loading && total === 0 && hideOnEmpty) {
        return null;
    }


    


    const filters = [
		{ value: 'all', label: <FormattedMessage {...messages.filterAll} /> },
		{ value: 'today', label: <FormattedMessage {...messages.filterToday} /> },
		{ value: 'future', label: <FormattedMessage {...messages.filterFuture} /> },
		{ value: 'past', label: <FormattedMessage {...messages.filterPast} /> },
		{ value: 'closed', label: <FormattedMessage {...messages.filterCompleted} /> }
	];

    const {taskType} = props;
    switch(taskType) {
        case 'today':
            tasks = tasks.filter(task => moment(task.endDate).isSame(today, 'day'));
            break;
        case 'future':
            tasks = tasks.filter(task => moment(task.endDate).isAfter(today, 'day'));
            break;
        case 'past':
            tasks = tasks.filter(task => moment(task.endDate).isBefore(today, 'day'));
            break;
    }
    if (taskType !== 'all') {
        let total = tasks.length;
    }
     
	//const groupedMedications = medications.groupBy('type')

	// console.log(medicationType);
	// console.log(medications);
	// if (medicationType != 'all') {
	// 	medications = medications.filter(medication => medication.type === medicationType);
	// }

	// const types = [{ value: 'at_times', label: <FormattedMessage  {...messages.atTimes} /> },
	// 	{ value: 'along_day', label: <FormattedMessage  {...messages.alongDay} /> },
	// 	{ value: 'as_needed', label: <FormattedMessage  {...messages.asNeeded} /> }];

    // console.log(props);
	const extra = (
		<React.Fragment>
            <CardExtraSplit>
				<CardQuickFilter filters={filters} value={props.taskType} onChange={props.updateTaskStatus} />
            </CardExtraSplit>
            <CardExtraSplit>
            <TaskManagerButton patient={user} />
            </CardExtraSplit>
    </React.Fragment>);
            


    return (<Card loading={loading} title={<FormattedMessage values={{count:total}} {...messages.tasksList} />} extra={extra}>
        <ListWithMessage
        emptyMessage={<FormattedMessage values={{type:taskType}} {...messages.tasksEmpty} />}
    itemLayout="vertical"
    pagination={{
      pageSize: 9,
      hideOnSinglePage:true,
      size:'small'
    }}
    dataSource={tasks}
    grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
    renderItem={(task, i) => {
        return <List.Item key={i} >
            <TaskCard task={task} />
        </List.Item>;
    }} 
    />
    </Card>)
}
export const TasksList = TasksListPure;

export default TasksList;