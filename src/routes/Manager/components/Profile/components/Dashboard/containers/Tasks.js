import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {ElementTrackerFragment, ElementTrackerReportFragment} from "../../../../../../Plan/components/Plan/fragments";
import { TasksList } from '../../../../Tasks';
import { UserInfoFragment } from '../../../../../../User/fragments';

export const GET_PATIENT_TASKS_QUERY = gql`
    query GET_PATIENT_TASKS ($userId: UID!) {
        patient (id: $userId) {
            id
            getTasks {
               totalCount
               edges {
                    id
                    sender {
                        ...UserInfo
                    }
                    title
                    endDate
                    priority
               }
            }
        }
    }
    ${UserInfoFragment}
`;

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
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);



export default withQuery(TasksList);