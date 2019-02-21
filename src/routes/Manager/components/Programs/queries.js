import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { ProgramFullFragment, ProgramManageFragment, ProgramFragment } from "./fragments";

const GET_PROGRAMS_QUERY = gql`    
    query GET_PROGRAMS ($search: String,  $cursors: CursorInput) {
        management {
            getPrograms (search: $search, cursors: $cursors) {
                edges {
                    ...Program
                    getReferralsCount
                }
                totalCount
            }
        }
    }
    ${ ProgramFragment }
`;

export const withProgramsQuery = graphql(
    GET_PROGRAMS_QUERY,
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
            const {getPrograms} = data.management || {};
            const {edges=[], totalCount=0} = getPrograms || {};
            const {status} = variables || {};
            return {
                programs: edges,
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

 
const GET_PROGRAM_QUERY = gql`    
    query GET_PROGRAM ($id: UID!) {
        management {
            getProgram (id: $id) {
                ...ProgramFull
            }
        }
    }
    ${ ProgramFullFragment }
`;

const GET_PROGRAM_MANAGE_QUERY = gql`    
    query GET_PROGRAM_MANAGE ($id: UID!) {
        management {
            getProgram (id: $id) {
                ...ProgramManage
            }
        }
    }
    ${ ProgramManageFragment }
`;


const singleQueryDefaultOpts = {
    options: (ownProps) => {
        const {id} = ownProps.program || {};
        return {
            variables: {
                id
            },
            fetchPolicy: 'network-only',
        }
    },
    props: ({ ownProps, data }) => {
        const { program } = ownProps;
        const {loading, management} = data;
        const { getProgram=program } = management || {};
        return {
            program: getProgram,
            loading: data.loading,
        }
    },
};

export const withProgramQuery = graphql(
    GET_PROGRAM_QUERY, singleQueryDefaultOpts
);

export const withProgramManageQuery = graphql(
    GET_PROGRAM_MANAGE_QUERY, singleQueryDefaultOpts
);