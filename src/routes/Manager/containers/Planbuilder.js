import Planbuilder from '../components/Planbuilder';
import Plan from '../../Plan/components/Plan';
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
                    id: ownProps.match.params.id,
                },
                fetchPolicy: 'network-only'
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



export default withQuery(Planbuilder);