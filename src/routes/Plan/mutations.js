import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const USER_PLAN_DELETE_MUTATION = gql`
    mutation  userPlanDeleteMutation($id: UID!) {
        deleteUserPlan(id: $id)
    }
`;
 
export const withDeleteUserPlanMutation = graphql(USER_PLAN_DELETE_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        deleteUP: () => {
            const  {userPlan} = ownProps;
            const {id} = userPlan || {};
            return mutate({
                variables: {id},
                // refetchQueries: [{
                //     query: GET_MEDICATION_QUERY,
                //     variables: {
                //         id: id,
                //         userId: userId,
                //         date:date
                //     },
                // }],
            });
        },
    }),
});
