import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { PersonalNoteFullFragment, PersonalNoteManageFragment, PersonalNoteFragment } from "./fragments";

const GET_PERSONAL_NOTES_QUERY = gql`    
    query GET_PERSONAL_NOTES ($search: String,  $cursors: CursorInput) {
        account {
            user {
                id
                getPersonalNotes (search: $search, cursors: $cursors) {
                    edges {
                        ...PersonalNote
                    }
                    totalCount
                }
            }
        }
    }
    ${ PersonalNoteFragment }
`;

export const withPersonalNotesQuery = graphql(
    GET_PERSONAL_NOTES_QUERY,
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
            const {user} = data.account || {};
            const {getPersonalNotes} = user || {};
            const {edges=[], totalCount=0} = getPersonalNotes || {};
            const {status} = variables || {};
            return {
                personalNotes: edges,
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

 
const GET_PERSONAL_NOTE_QUERY = gql`    
    query GET_PERSONAL_NOTE ($id: UID!) {
        account {
            user {
                id
                getPersonalNote (id: $id) {
                    ...PersonalNoteFull
                }
            }
        }
    }
    ${ PersonalNoteFullFragment }
`;

const GET_PERSONAL_NOTE_MANAGE_QUERY = gql`    
    query GET_PERSONAL_NOTE_MANAGE ($id: UID!) {
        account {
            user {
                id
                getPersonalNote (id: $id) {
                    ...PersonalNoteManage
                }
            }
        }
    }
    ${ PersonalNoteManageFragment }
`;


const singleQueryDefaultOpts = {
    options: (ownProps) => {
        const {id} = ownProps.personalNote || {};
        return {
            variables: {
                id
            },
            fetchPolicy: 'network-only',
        }
    },
    props: ({ ownProps, data }) => {
        const { personalNote } = ownProps;
        const {loading, account} = data;
        const {user} = account || {};
        const { getPersonalNote=personalNote } = user || {};
        return {
            personalNote: getPersonalNote,
            loading: loading,
        }
    },
};

export const withPersonalNoteQuery = graphql(
    GET_PERSONAL_NOTE_QUERY, singleQueryDefaultOpts
);

export const withPersonalNoteManageQuery = graphql(
    GET_PERSONAL_NOTE_MANAGE_QUERY, singleQueryDefaultOpts
);