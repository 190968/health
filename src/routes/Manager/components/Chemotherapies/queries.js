import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { ChemotherapyFullFragment, ChemotherapyManageFragment, ChemotherapyFragment } from "./fragments";

const GET_CHEMOTHERAPYS_QUERY = gql`    
    query GET_CHEMOTHERAPYS ($search: String,  $cursors: CursorInput) {
        health {
            getChemotherapies (search: $search, cursors:$cursors) {
                totalCount
                edges {
                    ...Chemotherapy
                }
            }
        }
    }
    ${ ChemotherapyFragment }
`;

export const withChemotherapysQuery = graphql(
    GET_CHEMOTHERAPYS_QUERY,
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
            const {getChemotherapies} = data.health || {};
            const {edges=[], totalCount=0} = getChemotherapies || {};
            const {status} = variables || {};
            return {
                chemotherapies: edges,
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

 
const GET_CHEMOTHERAPY_QUERY = gql`    
    query GET_CHEMOTHERAPY ($id: UID!) {
        health {
            getChemotherapy (id: $id) {
                ...ChemotherapyFull
            }
        }
    }
    ${ ChemotherapyFullFragment }
`;

const GET_CHEMOTHERAPY_MANAGE_QUERY = gql`    
    query GET_CHEMOTHERAPY_MANAGE ($id: UID!) {
        health {
            getChemotherapy (id: $id) {
                ...ChemotherapyManage
            }
        }
    }
    ${ ChemotherapyManageFragment }
`;


const singleQueryDefaultOpts = {
    options: (ownProps) => {
        const {id} = ownProps.chemotherapy || {};
        return {
            variables: {
                id
            },
            fetchPolicy: 'network-only',
        }
    },
    props: ({ ownProps, data }) => {
        const { chemotherapy } = ownProps;
        const {loading, health} = data;
        const { getChemotherapy=chemotherapy } = health || {};
        return {
            chemotherapy: getChemotherapy,
            loading: data.loading,
        }
    },
};

export const withChemotherapyQuery = graphql(
    GET_CHEMOTHERAPY_QUERY, singleQueryDefaultOpts
);

export const withChemotherapyManageQuery = graphql(
    GET_CHEMOTHERAPY_MANAGE_QUERY, singleQueryDefaultOpts
);