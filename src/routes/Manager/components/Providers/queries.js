import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { ProviderFullFragment, NetworkProviderFragment, ProviderManageFragment } from "./fragments";

export const GET_PROVIDERS_QUERY = gql`    
    query GET_PROVIDERS ($search: String, $status: StatusActiveArchivedEnum,  $cursors: CursorInput) {
        network {
            id
            getProviders(search:$search, status: $status, cursors: $cursors) {
                totalCount
                edges {
                    ...ProviderFull
                }
            }
        }
    }
    ${ ProviderFullFragment }
`;

export const GET_NETWORK_PROVIDERS_QUERY = gql`    
    query GET_NETWORK_PROVIDERS ($search: String, $status: StatusActiveArchivedEnum, $cursors: CursorInput) {
        network {
            id
            getNetworkProviders(search:$search, status: $status, cursors: $cursors) {
                totalCount
                edges {
                    ...NetworkProvider
                    provider {
                        ...ProviderFull
                    }
                }
            }
        }
    }
    ${ NetworkProviderFragment }
    ${ ProviderFullFragment }
`;

export const withNetworkProvidersQuery = graphql(
    GET_NETWORK_PROVIDERS_QUERY,
    {
        options: (ownProps) => {
            const {filters} = ownProps || {};
            return {
                variables: {
                    filters
                },
                fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {
            const {variables, network} = data;
            const {getNetworkProviders} = network || {};
            const {edges=[], totalCount=0} = getNetworkProviders || {};
            const {status} = variables || {};
            return {
                providers: edges,
                total: totalCount,
                loading: data.loading,
                refetch: data.refetch,
                refetchList: data.refetch,
                status: status,
                doSearch(search) {
                    return data.refetch({
                        search
                    })
                },
                loadByStatus(status) {
                    return data.refetch({
                        status
                    })
                },
                loadMoreEntries(variables) {
                    return data.refetch(variables);
                }
            }
        },
    }
);

 
const GET_PROVIDER_QUERY = gql`    
    query GET_PROVIDER ($id: UID!) {
        network {
            id
            getProvider (id: $id) {
                ...ProviderFull
            }
        }
    }
    ${ ProviderFullFragment }
`;

const GET_NETWORK_PROVIDER_QUERY = gql`    
    query GET_NETWORK_PROVIDER ($id: UID!) {
        network {
            id
            getNetworkProvider (id: $id) {
                ...NetworkProvider
            }
        }
    }
    ${ NetworkProviderFragment }
`;



const GET_PROVIDER_MANAGE_QUERY = gql`    
    query GET_PROVIDER_MANAGE ($id: UID!) {
        network {
            id
            getProvider (id: $id) {
                ...ProviderManage
            }
        }
    }
    ${ ProviderManageFragment }
`;

const providerDefaultOpts = {
    options: (ownProps) => {
        const {id} = ownProps.provider || {};
        return {
            variables: {
                id
            },
            fetchPolicy: 'network-only',
        }
    },
    props: ({ ownProps, data }) => {
        const { provider } = ownProps;
        const {loading, network} = data;
        const { getProvider=provider } = network || {};
        return {
            provider: getProvider,
            loading: data.loading,
        }
    },
};

export const withProviderQuery = graphql(
    GET_PROVIDER_QUERY, providerDefaultOpts
);

export const withProviderManageQuery = graphql(
    GET_PROVIDER_MANAGE_QUERY, providerDefaultOpts
);

export const withNetworkProviderQuery = graphql(
    GET_NETWORK_PROVIDER_QUERY,
    {
        options: (ownProps) => {
            const {id} = ownProps.networkProvider || {};
            return {
                variables: {
                    id
                },
                fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {
            const { provider } = ownProps;
            const {loading, network} = data;
            const { getProvider=provider } = network || {};
            return {
                provider: getProvider,
                loading: data.loading,
            }
        },
    }
);
