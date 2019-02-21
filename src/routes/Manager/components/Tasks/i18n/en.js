import { defineMessages } from 'react-intl';

export const TaskManageri18n = defineMessages({
    'task': {
        "id": "task",
        "defaultMessage": "Task",
        "description": "Task"
    },
    'viewTask': {
        "id": "task.view",
        "defaultMessage": "View Task",
        "description": "View Task"
    },
    'filterAll': {
        "id": "task.filter.all",
        "defaultMessage": "All",
        "description": "All"
    },
    'filterToday': {
        "id": "task.filter.today",
        "defaultMessage": "Due Today",
        "description": "Due Today"
    },
    'filterPast': {
        "id": "task.filter.past",
        "defaultMessage": 'Past Due',
        "description": 'Past Due'
    },
    'filterCompleted': {
        "id": "task.filter.completed",
        "defaultMessage": 'Completed',
        "description": 'Completed'
    },
    'filterFuture': {
        "id": "task.filter.future",
        "defaultMessage": 'Future',
        "description": 'Future'
    },
    'tasksList': {
        "id": "task.list",
        "defaultMessage": "Tasks {count,  plural, =0 {} other {({count})}}",
        "description": "Tasks {count,  plural, =0 {} other {({count})}}"
    },
    'tasksEmpty': {
        "id": "task.list.empty",
        "defaultMessage": "No {type, select, all {} today {Due Today} future {Future} past {Past Due}} Tasks",
        "description": "No Tasks"
    },
    
})

export default TaskManageri18n;




// export default defineMessages({
//     '': {
//         "id": "",
//         "defaultMessage": "",
//         "description": ""
//     },
// })
