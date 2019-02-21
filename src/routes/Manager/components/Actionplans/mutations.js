
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { PlanFragment } from './fragments';
import {branch, compose} from 'recompose';
import { withActionplansQuery } from './queries';

const DELETE_ACTIONPLAN_MUTATION = gql`
    mutation DELETE_ACTIONPLAN($id: UID!){
        deletePlan(id:$id)
    }
`;
 
export const withDeleteActionplanMutation = graphql(DELETE_ACTIONPLAN_MUTATION, {
    props: ({ownProps:{ plan }, mutate }) => ({
        deleteActionplan: () => {
            return mutate({variables: { id: plan.id}});
        },
    }),
});