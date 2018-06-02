import gql from 'graphql-tag';
import {HealthElementFragment} from "./components/fragments";

export const GET_USER_HEALTH_ITEMS_QUERY = gql`
    query GET_USER_HEALTH_ITEMS ($userId: UID!, $type: String!) {
        patient (id: $userId) {
            id
            healthRecords (type: $type) {
                totalCount
                edges {
                    ...HealthElement
                }
            }
            
        }
    }
    ${HealthElementFragment}
`;