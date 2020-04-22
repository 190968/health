import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { CancerFullFragment, CancerManageFragment, CancerFragment } from "./fragments";

const GET_CANCERS_QUERY = gql`    
    query GET_CANCERS ($search: String) {
        health {
            getCancers:getCancersList (search: $search) {
                ...Cancer
            }
        }
    }
    ${ CancerFragment }
`;

export const withCancersQuery = graphql(
    GET_CANCERS_QUERY,
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
            const {getCancers=[]} = data.health || {};
            // const {edges=[], totalCount=0} = getCancers || {};
            const {status} = variables || {};
            return {
                cancers: getCancers,
                total: getCancers.length,
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

 
const GET_CANCER_QUERY = gql`    
    query GET_CANCER ($id: UID!) {
        health {
            getCancer (id: $id) {
                ...CancerFull
            }
        }
    }
    ${ CancerFullFragment }
`;

const GET_CANCER_MANAGE_QUERY = gql`    
    query GET_CANCER_MANAGE ($id: UID!) {
        health {
            getCancer (id: $id) {
                ...CancerManage
            }
        }
    }
    ${ CancerManageFragment }
`;


const singleQueryDefaultOpts = {
    options: (ownProps) => {
        const {id} = ownProps.cancer || {};
        return {
            variables: {
                id
            },
            fetchPolicy: 'network-only',
        }
    },
    props: ({ ownProps, data }) => {
        const { cancer } = ownProps;
        const {loading, health} = data;
        const { getCancer=cancer } = health || {};
        return {
            cancer: getCancer,
            loading: data.loading,
        }
    },
};

export const withCancerQuery = graphql(
    GET_CANCER_QUERY, singleQueryDefaultOpts
);

export const withCancerManageQuery = graphql(
    GET_CANCER_MANAGE_QUERY, singleQueryDefaultOpts
);