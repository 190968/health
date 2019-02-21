import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { TasksList } from '../../../../Tasks';
import { GET_PATIENT_TASKS_QUERY } from '../../../../Tasks/queries';
import { compose, withState, withHandlers } from 'recompose';

 
const withQuery = graphql(
    GET_PATIENT_TASKS_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                userId: ownProps.user.id,
            }
        }),
        props: ({data}) => {
            if (!data.loading) {
                return {
                    tasks: data.patient.getTasks.edges,
                    loading: data.loading,
                    changeStatus(status) {
                        return data.refetch({status});
                    }
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);

const enhance = compose(
    withQuery,
    withState('taskType', 'setTaskType', 'all'),
    withHandlers({
        updateTaskStatus: props => (type) => {
            // if 
            if (type === 'closed') {
                // load closed
                props.changeStatus('closed');
            } else if (props.taskType==='closed') {
                props.changeStatus('open');
            }
            

            props.setTaskType(type);
        }
    })
)


export default enhance(TasksList);