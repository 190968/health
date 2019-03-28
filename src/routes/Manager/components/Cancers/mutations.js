
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { CancerFragment } from './fragments';
import {branch, compose} from 'recompose';
import { withCancerManageQuery } from './queries';

const DELETE_CANCER_MUTATION = gql`
    mutation DELETE_CANCER($id: UID!){
        deleteCancer(id:$id)
    }
`;
const CREATE_CANCER_MUTATION = gql`
    mutation CREATE_CANCER($input: CancerInput!){
        createCancer(input:$input) {
            ...Cancer
        }
    }
    ${ CancerFragment }
`;
const UPDATE_CANCER_MUTATION = gql`
    mutation UPDATE_CANCER($id: UID!, $input: CancerInput!){
        updateCancer(id:$id, input: $input) {
            ...Cancer
        }
    }
    ${ CancerFragment }
`;

export const withDeleteCancerMutation = graphql(DELETE_CANCER_MUTATION, {
    props: ({ownProps:{ cancer }, mutate }) => ({
        deleteCancer: () => {
            return mutate({variables: { id: cancer.id}});
        },
    }),
});

const withCreateCancerMutation = graphql(CREATE_CANCER_MUTATION, {
    props: ({ownProps, mutate }) => ({
        createCancer: (input) => {
            return mutate({variables: { input }});
        },
    }),
});

const withUpdateCancerMutation = graphql(UPDATE_CANCER_MUTATION, {
    props: ({ownProps:{ cancer }, mutate }) => ({
        updateCancer: (input) => {
            return mutate({variables: { id: cancer.id, input}});
        },
    }),
});

const withUpdateCancerMutationQuery = compose(
    withCancerManageQuery,
    withUpdateCancerMutation
);
export const withCreateOrUpdateCancer = branch(props => props.cancer, withUpdateCancerMutationQuery, withCreateCancerMutation);