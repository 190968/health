
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { BrahmFragment } from './fragments';
import {branch, compose} from 'recompose';
import { withBrahmManageQuery } from './queries';

const DELETE_BRAHM_MUTATION = gql`
    mutation DELETE_BRAHM($id: UID!){
        deleteBrahm(id:$id)
    }
`;
const CREATE_BRAHM_MUTATION = gql`
    mutation CREATE_BRAHM($input: BrahmInput!){
        createBrahm(input:$input) {
            ...BrahmPure
        }
    }
    ${ BrahmFragment }
`;
const UPDATE_BRAHM_MUTATION = gql`
    mutation UPDATE_BRAHM($id: UID!, $input: BrahmInput!){
        updateBrahm(id:$id, input: $input) {
            ...BrahmPure
        }
    }
    ${ BrahmFragment }
`;

export const withDeleteBrahmMutation = graphql(DELETE_BRAHM_MUTATION, {
    props: ({ownProps:{ brahm }, mutate }) => ({
        deleteBrahm: () => {
            return mutate({variables: { id: brahm.id}});
        },
    }),
});

const withCreateBrahmMutation = graphql(CREATE_BRAHM_MUTATION, {
    props: ({ownProps, mutate }) => ({
        createBrahm: (input) => {
            return mutate({variables: { input }});
        },
    }),
});

const withUpdateBrahmMutation = graphql(UPDATE_BRAHM_MUTATION, {
    props: ({ownProps:{ brahm }, mutate }) => ({
        updateBrahm: (input) => {
            return mutate({variables: { id: brahm.id, input}});
        },
    }),
});

const withUpdateBrahmMutationQuery = compose(
    withBrahmManageQuery,
    withUpdateBrahmMutation
);
export const withCreateOrUpdateBrahm = branch(props => props.brahm, withUpdateBrahmMutationQuery, withCreateBrahmMutation);