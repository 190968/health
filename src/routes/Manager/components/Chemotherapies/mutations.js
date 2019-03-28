
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { ChemotherapyFragment } from './fragments';
import {branch, compose} from 'recompose';
import { withChemotherapyManageQuery } from './queries';

const DELETE_CHEMOTHERAPY_MUTATION = gql`
    mutation DELETE_CHEMOTHERAPY($id: UID!){
        deleteChemotherapy(id:$id)
    }
`;
const CREATE_CHEMOTHERAPY_MUTATION = gql`
    mutation CREATE_CHEMOTHERAPY($input: ChemotherapyInput!){
        createChemotherapy(input:$input) {
            ...Chemotherapy
        }
    }
    ${ ChemotherapyFragment }
`;
const UPDATE_CHEMOTHERAPY_MUTATION = gql`
    mutation UPDATE_CHEMOTHERAPY($id: UID!, $input: ChemotherapyInput!){
        updateChemotherapy(id:$id, input: $input) {
            ...Chemotherapy
        }
    }
    ${ ChemotherapyFragment }
`;

export const withDeleteChemotherapyMutation = graphql(DELETE_CHEMOTHERAPY_MUTATION, {
    props: ({ownProps:{ chemotherapy }, mutate }) => ({
        deleteChemotherapy: () => {
            return mutate({variables: { id: chemotherapy.id}});
        },
    }),
});

const withCreateChemotherapyMutation = graphql(CREATE_CHEMOTHERAPY_MUTATION, {
    props: ({ownProps, mutate }) => ({
        createChemotherapy: (input) => {
            return mutate({variables: { input }});
        },
    }),
});

const withUpdateChemotherapyMutation = graphql(UPDATE_CHEMOTHERAPY_MUTATION, {
    props: ({ownProps:{ chemotherapy }, mutate }) => ({
        updateChemotherapy: (input) => {
            return mutate({variables: { id: chemotherapy.id, input}});
        },
    }),
});

const withUpdateChemotherapyMutationQuery = compose(
    withChemotherapyManageQuery,
    withUpdateChemotherapyMutation
);
export const withCreateOrUpdateChemotherapy = branch(props => props.chemotherapy, withUpdateChemotherapyMutationQuery, withCreateChemotherapyMutation);