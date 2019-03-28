
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { CancerStageFragment } from './fragments';
import {branch, compose} from 'recompose';
import { withCancerStageManageQuery } from './queries';

const DELETE_CANCER_STAGE_MUTATION = gql`
    mutation DELETE_CANCER_STAGE($id: UID!){
        deleteCancerStage(id:$id)
    }
`;
const CREATE_CANCER_STAGE_MUTATION = gql`
    mutation CREATE_CANCER_STAGE($input: CancerStageInput!){
        createCancerStage(input:$input) {
            ...CancerStage
        }
    }
    ${ CancerStageFragment }
`;
const UPDATE_CANCER_STAGE_MUTATION = gql`
    mutation UPDATE_CANCER_STAGE($id: UID!, $input: CancerStageInput!){
        updateCancerStage(id:$id, input: $input) {
            ...CancerStage
        }
    }
    ${ CancerStageFragment }
`;

export const withDeleteCancerStageMutation = graphql(DELETE_CANCER_STAGE_MUTATION, {
    props: ({ownProps:{ cancerStage }, mutate }) => ({
        deleteCancerStage: () => {
            return mutate({variables: { id: cancerStage.id}});
        },
    }),
});

const withCreateCancerStageMutation = graphql(CREATE_CANCER_STAGE_MUTATION, {
    props: ({ownProps, mutate }) => ({
        createCancerStage: (input) => {
            return mutate({variables: { input }});
        },
    }),
});

const withUpdateCancerStageMutation = graphql(UPDATE_CANCER_STAGE_MUTATION, {
    props: ({ownProps:{ cancerStage }, mutate }) => ({
        updateCancerStage: (input) => {
            return mutate({variables: { id: cancerStage.id, input}});
        },
    }),
});

const withUpdateCancerStageMutationQuery = compose(
    withCancerStageManageQuery,
    withUpdateCancerStageMutation
);
export const withCreateOrUpdateCancerStage = branch(props => props.cancerStage, withUpdateCancerStageMutationQuery, withCreateCancerStageMutation);