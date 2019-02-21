import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { branch, compose } from 'recompose';
import {TaskInfoFragment} from './fragments';
import { GET_PATIENT_TASKS_QUERY } from './queries';

export const UPDATE_TASK_MUTATION = gql`
    mutation updateTask($id: UID!, $input:TaskInput!) {
        updateTask(id:$id, input: $input) {
            ...TaskInfo
        }
    }
    ${TaskInfoFragment}
`;
export const withUpdateMutation = graphql(UPDATE_TASK_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        updateTask: (input) => {
            return mutate({
                variables: { id: ownProps.task.id, input: input },
            })
        },
    }),
});

export const FORWARD_TASK_MUTATION = gql`
    mutation forwardTask($id: UID!, $input:TaskAssignInput!) {
        forwardTask(id:$id, input: $input) {
            ...TaskInfo
        }
    }
    ${TaskInfoFragment}
`;
export const withForwardTaskMutation = graphql(FORWARD_TASK_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        forwardTask: (input) => {
            return mutate({
                variables: { id: ownProps.task.id, input: input },
            })
        },
    }),
});




export const CREATE_TASK_MUTATION = gql`
    mutation createTask( $input:TaskInput!) {
        createTask(input: $input) {
            ...TaskInfo
        }
    }
    ${TaskInfoFragment}
`;

export const withAddMutation = graphql(CREATE_TASK_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        addTask: (input) => {
            const {patientId} = input;
            return mutate({
                variables: { input: input },
                refetchQueries: [{
                    query: GET_PATIENT_TASKS_QUERY,
                    variables: { userId: patientId }
                }],
            })
        },
    }),
});

// if this is a child - then add children
export const withTaskMutation = compose(
    branch(props => props.task && props.task.id !== '', withUpdateMutation, withAddMutation),
);



export const UPDATE_TASK_STATUS_MUTATION = gql`
    mutation updateTaskStatus($id: UID!, $status:TaskStatusEnum!) {
        updateTaskStatus(id:$id, status: $status) {
            ...TaskInfo
        }
    }
    ${TaskInfoFragment}
`;
export const withUpdateTaskStatusMutation = graphql(UPDATE_TASK_STATUS_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        updateTaskStatus: (status) => {
            return mutate({
                variables: { id: ownProps.task.id, status },
            })
        },
    }),
});