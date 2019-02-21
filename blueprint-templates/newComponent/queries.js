import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { {{pascalCase $moduleName}}FullFragment, {{pascalCase $moduleName}}ManageFragment, {{pascalCase $moduleName}}Fragment } from "./fragments";

const GET_{{upperCase $moduleName}}S_QUERY = gql`    
    query GET_{{upperCase $moduleName}}S ($search: String,  $cursors: CursorInput) {
        management {
            get{{pascalCase $moduleName}}s (search: $search, cursors: $cursors) {
                edges {
                    ...{{pascalCase $moduleName}}
                }
                totalCount
            }
        }
    }
    ${ {{pascalCase $moduleName}}Fragment }
`;

export const with{{pascalCase $moduleName}}sQuery = graphql(
    GET_{{upperCase $moduleName}}S_QUERY,
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
            const {get{{pascalCase $moduleName}}s} = data.management || {};
            const {edges=[], totalCount=0} = get{{pascalCase $moduleName}}s || {};
            const {status} = variables || {};
            return {
                {{camelCase $moduleName}}s: edges,
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

 
const GET_{{upperCase $moduleName}}_QUERY = gql`    
    query GET_{{upperCase $moduleName}} ($id: UID!) {
        management {
            get{{pascalCase $moduleName}} (id: $id) {
                ...{{pascalCase $moduleName}}Full
            }
        }
    }
    ${ {{pascalCase $moduleName}}FullFragment }
`;

const GET_{{upperCase $moduleName}}_MANAGE_QUERY = gql`    
    query GET_{{upperCase $moduleName}}_MANAGE ($id: UID!) {
        management {
            get{{pascalCase $moduleName}} (id: $id) {
                ...{{pascalCase $moduleName}}Manage
            }
        }
    }
    ${ {{pascalCase $moduleName}}ManageFragment }
`;


const singleQueryDefaultOpts = {
    options: (ownProps) => {
        const {id} = ownProps.{{camelCase $moduleName}} || {};
        return {
            variables: {
                id
            },
            fetchPolicy: 'network-only',
        }
    },
    props: ({ ownProps, data }) => {
        const { {{camelCase $moduleName}} } = ownProps;
        const {loading, management} = data;
        const { get{{pascalCase $moduleName}}={{camelCase $moduleName}} } = management || {};
        return {
            {{camelCase $moduleName}}: get{{pascalCase $moduleName}},
            loading: data.loading,
        }
    },
};

export const with{{pascalCase $moduleName}}Query = graphql(
    GET_{{upperCase $moduleName}}_QUERY, singleQueryDefaultOpts
);

export const with{{pascalCase $moduleName}}ManageQuery = graphql(
    GET_{{upperCase $moduleName}}_MANAGE_QUERY, singleQueryDefaultOpts
);