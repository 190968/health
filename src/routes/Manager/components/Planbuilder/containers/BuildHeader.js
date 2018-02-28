import BuildHeader from '../components/BuildHeader';
import Plan from '../../../../Plan/components/Plan';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const ActionPlans_QUERY = gql`    
    query GET_PLANBUILDER_PLAN ($id: UID) {
            plan (id:$id) {
                ...PlanCardInfo
                schedule {
                  type
                  startDate
                  endDate
                  limitStartDow
                  relativeEndDay
                  dows
                }
            }
    }
    ${Plan.fragments.plan}
`;

// 1- add queries:
const withQuery = graphql(
    ActionPlans_QUERY,
    {
        //name: 'PlanstorePlans',
        options: (ownProps) => {
            return {
                //skip: !ownProps.ready,
                variables: {
                    id: ownProps.plan.id,
                },
                fetchPolicy: 'cache-only'
            }

        },
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                return {
                    plan: data.plan,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);



const PlanUpdateMutation = gql`
    mutation PlanUpdate($id: UID!, $input:PlanInput!){
        planUpdate(id:$id, input:$input) {
            id
        }
    }
`;



const withMutation = graphql(PlanUpdateMutation, {
    props: ({ ownProps, mutate }) => ({
        onSubmit: (input) => {
            return mutate({
                variables: { id: ownProps.plan.id, input: input}
            })
        },

    }),
});

export default withMutation((BuildHeader));//withQuery