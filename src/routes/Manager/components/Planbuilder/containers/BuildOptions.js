import BuildOptions from '../components/BuildOptions';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';
import { withSpinnerWhileLoading } from '../../../../../components/Modal';
import { PlanDetailsFragment } from '../../../../../components/Plan/fragments';
 



const PLAN_DETAILS_QUERY = gql`    
    query GET_PLANBUILDER_PLAN ($id: UID) {
        getPlan (id:$id) {
            id
            ...PlanDetails
            
        }
    }
    ${PlanDetailsFragment}
`;

// 1- add queries:
const withQuery = graphql(
    PLAN_DETAILS_QUERY,
    {
        options: (ownProps) => {
            return {
                variables: {
                    id: ownProps.plan.id,
                },
                // fetchPolicy: 'network-only'
            }

        },
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                return {
                    plan: data.getPlan,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);

const PlanUpdateDetails_Mutation = gql`
    mutation UpdatePlanDetails($id: UID!, $type: String!, $input:PlanDetailsInput!){
        updatePlanDetails(id:$id, type:$type, input:$input) {
            id
            ...PlanDetails
        }
    }
     ${PlanDetailsFragment}
`;

const withMutation = graphql(PlanUpdateDetails_Mutation, {
    props: ({ ownProps, mutate }) => ({
        updateDetails: (input, type) => {
            return mutate({
                variables: { id: ownProps.plan.id, input, type}
            }).then(({data}) => {
                //submitCallback(data.planUpdate);
            });
        },
    }),
});
  

const enhance = compose(
    withQuery,
    withSpinnerWhileLoading,
    withMutation
)
export default enhance((BuildOptions));