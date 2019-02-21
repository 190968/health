
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
 import {CohortPureFragment, UserCohortPureFragment} from './fragments';
 import {branch, compose} from 'recompose';
import { withCohortQuery, GET_COHORTS_QUERY } from './queries';

const DELETE_COHORT_MUTATION = gql`
    mutation DELETE_COHORT($id: UID!){
        deleteCohort(id:$id)
    }
`;
const CREATE_COHORT_MUTATION = gql`
    mutation CREATE_COHORT($input: CohortInput!){
        createCohort(input:$input) {
            ...CohortPure
        }
    }
    ${CohortPureFragment}
`;
const UPDATE_COHORT_MUTATION = gql`
    mutation UPDATE_COHORT($id: UID!, $input: CohortInput!){
        updateCohort(id:$id, input: $input) {
            ...CohortPure
        }
    }
    ${CohortPureFragment}
`;

export const withDeleteCohortMutation = graphql(DELETE_COHORT_MUTATION, {
    props: ({ownProps:{cohort}, mutate }) => ({
        deleteCohort: () => {
            return mutate({
                variables: { id: cohort.id}, 
                refetchQueries: [{query:GET_COHORTS_QUERY}]
            });
        },
    }),
});

const withCreateCohortMutation = graphql(CREATE_COHORT_MUTATION, {
    props: ({ownProps:{cohort}, mutate }) => ({
        createCohort: (input) => {
            return mutate({
                variables: { input },
                //refetchQueries: [{query:GET_COHORTS_QUERY}]
            });
        },
    }),
});

const withUpdateCohortMutation = graphql(UPDATE_COHORT_MUTATION, {
    props: ({ownProps:{cohort}, mutate }) => ({
        updateCohort: (input) => {
            return mutate({variables: { id: cohort.id, input}});
        },
    }),
});

const withUpdateCohortMutationQuery = compose(
    withCohortQuery,
    withUpdateCohortMutation
);
export const withCreateOrUpdateCohort = branch(props => props.cohort, withUpdateCohortMutationQuery, withCreateCohortMutation);


///// COHORT POPULATION
const DELETE_COHORT_USER_MUTATION = gql`
    mutation DELETE_COHORT_USER($id: UID!){
        deleteCohortUser(id:$id)
    }
`;
const CREATE_COHORT_USERS_MUTATION = gql`
    mutation createCohortUsers($id: UID!, $role: CohortRoleEnum!, $usersId: [UID]!){
        createCohortUsers(id: $id,usersId:$usersId, role:$role) {
            ...UserCohortPure
        }
    }
    ${UserCohortPureFragment}
`;

export const withCreateCohortUsersMutation = graphql(CREATE_COHORT_USERS_MUTATION, {
    props: ({ownProps, mutate }) => ({
        createCohortUsers: (usersId) => {
            const {role} = ownProps;
            const {id} = ownProps.cohort || {};
            return mutate({variables: {id, usersId, role }});
        },
    }),
});
export const withDeleteCohortUserMutation = graphql(DELETE_COHORT_USER_MUTATION, {
    props: ({ownProps, mutate }) => ({
        deleteCohortUser: () => {
            const {id} = ownProps.cohortUser || {};
            return mutate({variables: {id }});
        },
    }),
});