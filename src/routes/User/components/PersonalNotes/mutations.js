
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { PersonalNoteFragment } from './fragments';
import {branch, compose} from 'recompose';
import { withPersonalNoteManageQuery } from './queries';

const DELETE_PERSONAL_NOTE_MUTATION = gql`
    mutation DELETE_PERSONAL_NOTE($id: UID!){
        deletePersonalNote(id:$id)
    }
`;
const CREATE_PERSONAL_NOTE_MUTATION = gql`
    mutation CREATE_PERSONAL_NOTE($input: PersonalNoteInput!){
        createPersonalNote(input:$input) {
            personalNote {
                ...PersonalNote
            }
        }
    }
    ${ PersonalNoteFragment }
`;
const UPDATE_PERSONAL_NOTE_MUTATION = gql`
    mutation UPDATE_PERSONAL_NOTE($id: UID!, $input: PersonalNoteInput!){
        updatePersonalNote(id:$id, input: $input) {
            personalNote {
                ...PersonalNote
            }
        }
    }
    ${ PersonalNoteFragment }
`;

export const withDeletePersonalNoteMutation = graphql(DELETE_PERSONAL_NOTE_MUTATION, {
    props: ({ownProps:{ personalNote }, mutate }) => ({
        deletePersonalNote: () => {
            return mutate({variables: { id: personalNote.id}});
        },
    }),
});

const withCreatePersonalNoteMutation = graphql(CREATE_PERSONAL_NOTE_MUTATION, {
    props: ({ownProps, mutate }) => ({
        createPersonalNote: (input) => {
            return mutate({variables: { input }});
        },
    }),
});

const withUpdatePersonalNoteMutation = graphql(UPDATE_PERSONAL_NOTE_MUTATION, {
    props: ({ownProps:{ personalNote }, mutate }) => ({
        updatePersonalNote: (input) => {
            return mutate({variables: { id: personalNote.id, input}});
        },
    }),
});

const withUpdatePersonalNoteMutationQuery = compose(
    withPersonalNoteManageQuery,
    withUpdatePersonalNoteMutation
);
export const withCreateOrUpdatePersonalNote = branch(props => props.personalNote, withUpdatePersonalNoteMutationQuery, withCreatePersonalNoteMutation);