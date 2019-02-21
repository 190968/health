import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserPlanFragment } from '../Plan/fragments';

 
const JOIN_USERPLAN_MUTATION = gql`
    mutation JOIN_USERPLAN($id: UID!){
        joinUserPlan(id:$id) {
            ...UserPlanInfo
        }
    }
    ${UserPlanFragment}
`;



export const withJoinUserPlanMutation = graphql(JOIN_USERPLAN_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        joinUserPlan: () => {
            return mutate({
                variables: { id: ownProps.userPlan.id}
            })
        },

    }),
});
