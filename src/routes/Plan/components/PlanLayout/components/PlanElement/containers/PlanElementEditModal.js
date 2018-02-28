import PlanElementEditModal from '../components/PlanElementEditModal';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Plan from '../../../../../../Plan/components/Plan';



export const GET_PLAN_ELEMENT_QUERY = gql`
    query GET_PLAN_ELEMENT ($id: UID!, $planId: UID!, $date: Date) {
        planElement (id: $id, planId:$planId) {
            ...PlanElement
        }
         
    }
    ${Plan.fragments.element}
`;

const PlanElementEditModalWithQuery = graphql(
    GET_PLAN_ELEMENT_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                id: ownProps.id,
                planId: ownProps.planId,
                date:''
            }

        }),
        props: ({ownProps, data}) => {
            if (!data.loading) {
                return {
                    element: data.planElement,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
)(PlanElementEditModal);


const deletePlanElement = gql`
    mutation deletePlanElement($id: UID!, $planId: UID!) {
        deletePlanElement(id:$id, planId: $planId)
    }
`;




export const withMutation = graphql(deletePlanElement, {
    props: ({ ownProps, mutate }) => ({
        updateElement: (id) => {
            return mutate({
                variables: { planId:ownProps.planId, id: id},
                update: (store, { data: { planElementReport } }) => {


                },
            })
        },

    }),
});


export default withMutation(PlanElementEditModalWithQuery);
