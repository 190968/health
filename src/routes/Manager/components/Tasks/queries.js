import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { TaskInfoFragment } from './fragments';

export const GET_PATIENT_TASKS_QUERY = gql`
query GET_PATIENT_TASKS ($userId: UID!, $status: TaskStatusEnum) {
    patient (id: $userId) {
        id
        getTasks (status: $status) {
           totalCount
           edges {
                ...TaskInfo
           }
        }
    }
}
${TaskInfoFragment}
`;