import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, branch} from 'recompose';
import {GET_USER_DIAGNOSES_QUERY} from "../../containers/Diagnoses";
import {HealthElementFragment} from "../fragments";

export const UPDATE_HEALTH_ELEMENT_MUTATION = gql`
    mutation updatePlanElement($id: UID!, $userId: UID!, $input:HealthRecordInput!) {
        updateHealthRecord(id:$id, userId: $userId, input: $input) {
            ...HealthElement
        }
    }
    ${HealthElementFragment}
`;

export const withUpdateMutation = graphql(UPDATE_HEALTH_ELEMENT_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        updateHealthRecord: (input) => {
            return mutate({
                variables: {userId:ownProps.user.id, id: ownProps.id, input:input},
            })
        },
    }),
});


export const ADD_HEALTH_ELEMENT_MUTATION = gql`
    mutation addHealthRecord($userId: UID!, $input:HealthRecordInput!, $isFamily: Boolean) {
        addHealthRecord(userId: $userId, input: $input, isFamily: $isFamily) {
          ...HealthElement
        }
    }
    ${HealthElementFragment}
`;
export const withAddMutation = graphql(ADD_HEALTH_ELEMENT_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        addHealthRecord: (input, type) => {
            const {isFamily} = ownProps;
            return mutate({
                variables: {userId:ownProps.user.id, input:input, isFamily},
                refetchQueries: [{
                    query: GET_USER_DIAGNOSES_QUERY,
                    variables: {userId:ownProps.user.id, isFamily}
                }],
            })
        },
    }),
});

// if this is a child - then add children
export const withMutation = compose(
    branch(props => props.id && props.id !== '', withUpdateMutation,  withAddMutation),
);