import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { BrahmFullFragment, BrahmManageFragment, BrahmFragment } from "./fragments";

const GET_BRAHMS_QUERY = gql`    
    query GET_BRAHMS ($search: String,  $cursors: CursorInput) {
        management {
            getBrahms (search: $search, cursors: $cursors) {
                edges {
                    ...Brahm
                }
                totalCount
            }
        }
    }
    ${ BrahmFragment }
`;

export const withBrahmsQuery = graphql(
    GET_BRAHMS_QUERY,
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
            const {variables} = data;
            const {getBrahms} = data.management || {};
            const {edges=[], totalCount=0} = getBrahms || {};
            const {status} = variables || {};
            return {
                brahms: edges,
                total: totalCount,
                loading: data.loading,
                status: status,
                refetch: data.refetch,
                refetchList: data.refetch,
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

 
const GET_BRAHM_QUERY = gql`    
    query GET_BRAHM ($id: UID!) {
        management {
            getBrahm (id: $id) {
                ...BrahmFull
            }
        }
    }
    ${ BrahmFullFragment }
`;

const GET_BRAHM_MANAGE_QUERY = gql`    
    query GET_BRAHM_MANAGE ($id: UID!) {
        management {
            getBrahm (id: $id) {
                ...BrahmManage
            }
        }
    }
    ${ BrahmManageFragment }
`;


const singleQueryDefaultOpts = {
    options: (ownProps) => {
        const {id} = ownProps.brahm || {};
        return {
            variables: {
                id
            },
            fetchPolicy: 'network-only',
        }
    },
    props: ({ ownProps, data }) => {
        const { brahm } = ownProps;
        const {loading, management} = data;
        const { getBrahm=brahm } = management || {};
        return {
            brahm: getBrahm,
            loading: data.loading,
        }
    },
};

export const withBrahmQuery = graphql(
    GET_BRAHM_QUERY, singleQueryDefaultOpts
);

export const withBrahmManageQuery = graphql(
    GET_BRAHM_MANAGE_QUERY, singleQueryDefaultOpts
);