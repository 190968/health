import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, branch} from 'recompose';
import { HealthElementFragment } from './components/fragments';
import { GET_USER_HEALTH_ITEMS_QUERY } from './queries';

const UPDATE_HEALTH_ELEMENT_MUTATION = gql`
    mutation updatePlanElement($id: UID!, $userId: UID!, $input:HealthRecordInput!) {
        updateHealthRecord(id:$id, userId: $userId, input: $input) {
            ...HealthElement
        }
    }
    ${HealthElementFragment}
`;

const withUpdateItemMutation = graphql(UPDATE_HEALTH_ELEMENT_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        updateHealthRecord: (input) => {
            return mutate({
                variables: {userId:ownProps.user.id, id: ownProps.healthRecord.id, input:input},
            })
        },
    }),
});


const CREATE_HEALTH_ELEMENT_MUTATION = gql`
    mutation addHealthRecord($userId: UID!, $input:HealthRecordInput!, $isFamily: Boolean) {
        createHealthRecord(userId: $userId, input: $input, isFamily: $isFamily) {
          ...HealthElement
        }
    }
    ${HealthElementFragment}
`;
const withCreateItemMutation = graphql(CREATE_HEALTH_ELEMENT_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        createHealthRecord: (input) => {
            const {isFamily, type} = ownProps;
            return mutate({
                variables: {userId:ownProps.user.id, input:input, isFamily},
                // refetchQueries: [{
                //     query: GET_USER_HEALTH_ITEMS_QUERY,
                //     variables: {userId:ownProps.user.id, type, isFamily}
                // }],
            })
        },
    }),
});

// if this is a child - then add children
export const withHealthItemMutation = compose(
    branch(props => props.healthRecord && props.healthRecord.id !== '', withUpdateItemMutation,  withCreateItemMutation),
);


const DELETE_HEALTH_ELEMENT_MUTATION = gql`
    mutation updatePlanElement($id: UID!) {
        deleteHealthRecord(id:$id)
    }
`;

export const withDeleteItemMutation = graphql(DELETE_HEALTH_ELEMENT_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        deleteHealthRecord: (input) => {
            const {id, healthType:type, isFamily=false} =  ownProps.healthRecord;
            return mutate({
                variables: {id},
                // refetchQueries: [{
                //     query: GET_USER_HEALTH_ITEMS_QUERY,
                //     variables: {userId:ownProps.user.id, type, isFamily}
                // }],
            })
        },
    }),
});