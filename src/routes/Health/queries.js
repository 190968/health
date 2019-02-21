import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose, branch} from 'recompose';
import {HealthElementFragment} from "./components/fragments";

export const GET_USER_HEALTH_ITEMS_QUERY = gql`
    query GET_USER_HEALTH_ITEMS ($userId: UID!, $type: String!, $isFamily: Boolean) {
        patient (id: $userId) {
            id
            healthRecords (type: $type, isFamily:$isFamily) {
                totalCount
                edges {
                    ...HealthElement
                }
            }
            
        }
    }
    ${HealthElementFragment}
`;


export const GET_USER_LAB_RESULTS_QUERY = gql`
    query GET_USER_LAB_RESULTS ($userId: UID!) {
        patient (id: $userId) {
            id
            getLabResults {
                totalCount
                edges {
                    id
                    title
                    measurements {
                        id
                    }
                    testDate
                }
            }
            
        }
    }
`;



 
const GET_HEALTH_RECORD_QUERY  = gql`
    query GET_HEALTH_RECORD($id:UID!) {
        health {
            getHealthRecord(id:$id) {
                ...HealthElement
            }
        }
    }
    ${HealthElementFragment}
`;

 const withHealthRecordQueryOnly = graphql(GET_HEALTH_RECORD_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                id: ownProps.healthRecord.id
            }
        }
    },
    props: ({ data }) => {
        if (!data.loading) {
            return {
                healthRecord: data.health.getHealthRecord,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});

export const withHealthRecordQuery = compose(
    branch(props => props.healthRecord && props.healthRecord.id !== '', withHealthRecordQueryOnly)
);
