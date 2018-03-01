import PlanElementActions from '../components/PlanElementActions';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const deletePlanElement = gql`
    mutation deletePlanElement($id: UID!, $planId: UID!) {
        deletePlanElement(id:$id, planId: $planId)
    }
`;




export const withMutation = graphql(deletePlanElement, {
    props: ({ ownProps, mutate }) => ({
        deleteElement: (id) => {
            return mutate({
                variables: { planId:ownProps.planId, id: id},
                update: (store, { data: { planElementReport } }) => {


                },
            })
        },

    }),
});


export default withMutation(PlanElementActions);
