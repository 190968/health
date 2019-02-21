
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
 import {ScreeningPureFragment, ScreeningPopulationFragment} from './fragments';
 import {branch, compose} from 'recompose';
import { withScreeningQuery } from './queries';

const DELETE_SCREENING_MUTATION = gql`
    mutation DELETE_SCREENING($id: UID!){
        deleteScreening(id:$id)
    }
`;
const CREATE_SCREENING_MUTATION = gql`
    mutation CREATE_SCREENING($input: ScreeningInput!){
        createScreening(input:$input) {
            ...ScreeningPure
        }
    }
    ${ScreeningPureFragment}
`;
const UPDATE_SCREENING_MUTATION = gql`
    mutation UPDATE_SCREENING($id: UID!, $input: ScreeningInput!){
        updateScreening(id:$id, input: $input) {
            ...ScreeningPure
        }
    }
    ${ScreeningPureFragment}
`;

export const withDeleteScreeningMutation = graphql(DELETE_SCREENING_MUTATION, {
    props: ({ownProps:{screening}, mutate }) => ({
        deleteScreening: () => {
            return mutate({variables: { id: screening.id}});
        },
    }),
});

const withCreateScreeningMutation = graphql(CREATE_SCREENING_MUTATION, {
    props: ({ownProps, mutate }) => ({
        createScreening: (input) => {
            return mutate({variables: { input }});
        },
    }),
});

const withUpdateScreeningMutation = graphql(UPDATE_SCREENING_MUTATION, {
    props: ({ownProps:{screening}, mutate }) => ({
        updateScreening: (input) => {
            return mutate({variables: { id: screening.id, input}});
        },
    }),
});

const withUpdateScreeningMutationQuery = compose(
    withScreeningQuery,
    withUpdateScreeningMutation
);
export const withCreateOrUpdateScreening = branch(props => props.screening, withUpdateScreeningMutationQuery, withCreateScreeningMutation);


///// SCREENING POPULATION
const DELETE_SCREENING_USER_MUTATION = gql`
    mutation DELETE_SCREENING_USER($id: UID!){
        deleteScreeningUser(id:$id)
    }
`;
const CREATE_SCREENING_USERS_MUTATION = gql`
    mutation createScreeningUsers($id: UID!, $usersId: [UID]!){
        createScreeningUsers(id: $id,usersId:$usersId) {
            ...ScreeningPopulation
        }
    }
    ${ScreeningPopulationFragment}
`;

export const withCreateScreeningUsersMutation = graphql(CREATE_SCREENING_USERS_MUTATION, {
    props: ({ownProps, mutate }) => ({
        createScreeningUsers: (usersId) => {
            const {id} = ownProps.screening || {};
            return mutate({variables: {id, usersId }});
        },
    }),
});
export const withDeleteScreeningUserMutation = graphql(DELETE_SCREENING_USER_MUTATION, {
    props: ({ownProps, mutate }) => ({
        deleteScreeningUser: () => {
            const {id} = ownProps.screeningUser || {};
            return mutate({variables: {id }});
        },
    }),
});