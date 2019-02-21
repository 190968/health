
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { ProviderFragment, NetworkProviderFragment, ProviderManageFragment} from './fragments';
import {branch, compose} from 'recompose';
import { withProviderManageQuery } from './queries';

const DELETE_PROVIDER_MUTATION = gql`
    mutation DELETE_PROVIDER($id: UID!){
        deleteProvider(id:$id)
    }
`;
const CREATE_PROVIDER_MUTATION = gql`
    mutation CREATE_PROVIDER($input: ProviderInput!){
        createNetworkProvider(input:$input) {
            ...NetworkProvider
        }
    }
    ${ NetworkProviderFragment }
`;
const UPDATE_PROVIDER_MUTATION = gql`
    mutation UPDATE_PROVIDER($id: UID!, $input: ProviderInput!){
        updateProvider(id:$id, input: $input) {
            ...ProviderManage
        }
    }
    ${ ProviderManageFragment }
`;

export const withDeleteProviderMutation = graphql(DELETE_PROVIDER_MUTATION, {
    props: ({ownProps:{ provider }, mutate }) => ({
        deleteProvider: () => {
            return mutate({variables: { id: provider.id}});
        },
    }),
});

const withCreateProviderMutation = graphql(CREATE_PROVIDER_MUTATION, {
    props: ({ownProps, mutate }) => ({
        createProvider: (input) => {
            return mutate({variables: { input }});
        },
    }),
});

const withUpdateProviderMutation = graphql(UPDATE_PROVIDER_MUTATION, {
    props: ({ownProps:{ provider }, mutate }) => ({
        updateProvider: (input) => {
            return mutate({variables: { id: provider.id, input}});
        },
    }),
});

const withUpdateProviderMutationQuery = compose(
    withProviderManageQuery,
    withUpdateProviderMutation
);
export const withCreateOrUpdateProvider = branch(props => props.provider, withUpdateProviderMutationQuery, withCreateProviderMutation);