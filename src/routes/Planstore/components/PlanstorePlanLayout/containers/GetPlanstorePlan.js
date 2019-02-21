import GetPlanstorePlanPure from '../components/GetPlanstorePlan'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const getPlanMutation = gql`
    mutation getPlan($id: UID!, $input:UserPlanInput!){
        getPlan(id:$id, input:$input) {
            id
        }
    }
`;



const withMutation = graphql(getPlanMutation, {
    props: ({ ownProps, mutate }) => ({
        getPlanstorePlan: (input) => {
            return mutate({
                variables: { id: ownProps.plan.id, input: input}
            })
        },

    }),
});

export const GetPlan = withMutation(GetPlanstorePlanPure);
export default GetPlan;