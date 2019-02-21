
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { ProgramFragment } from './fragments';
import {branch, compose} from 'recompose';
import { withProgramManageQuery } from './queries';

const DELETE_PROGRAM_MUTATION = gql`
    mutation DELETE_PROGRAM($id: UID!){
        deleteProgram(id:$id)
    }
`;
const CREATE_PROGRAM_MUTATION = gql`
    mutation CREATE_PROGRAM($input: ProgramInput!){
        createProgram(input:$input) {
            ...Program
        }
    }
    ${ ProgramFragment }
`;
const UPDATE_PROGRAM_MUTATION = gql`
    mutation UPDATE_PROGRAM($id: UID!, $input: ProgramInput!){
        updateProgram(id:$id, input: $input) {
            ...Program
        }
    }
    ${ ProgramFragment }
`;

export const withDeleteProgramMutation = graphql(DELETE_PROGRAM_MUTATION, {
    props: ({ownProps:{ program }, mutate }) => ({
        deleteProgram: () => {
            return mutate({variables: { id: program.id}});
        },
    }),
});

const withCreateProgramMutation = graphql(CREATE_PROGRAM_MUTATION, {
    props: ({ownProps, mutate }) => ({
        createProgram: (input) => {
            return mutate({variables: { input }});
        },
    }),
});

const withUpdateProgramMutation = graphql(UPDATE_PROGRAM_MUTATION, {
    props: ({ownProps:{ program }, mutate }) => ({
        updateProgram: (input) => {
            return mutate({variables: { id: program.id, input}});
        },
    }),
});

const withUpdateProgramMutationQuery = compose(
    withProgramManageQuery,
    withUpdateProgramMutation
);
export const withCreateOrUpdateProgram = branch(props => props.program, withUpdateProgramMutationQuery, withCreateProgramMutation);