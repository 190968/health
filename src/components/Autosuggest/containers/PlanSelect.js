import PlanSelect from '../components/PlanSelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {PlanCardFragment} from "../../../routes/Plan/components/Plan/fragments";

export const PlansListQUERY = gql`
    query GET_PLANS_LIST ($search: String)  {
        management {
            getPlans (search: $search) {
                totalCount
                edges {
                    ...PlanCardInfo
                }
            }
        }
    }
    ${PlanCardFragment}
`;

export const withPlansSelectQuery = graphql(PlansListQUERY,
    {
        options: () => {
            return {
                fetchPolicy: 'network-only'
            }},
        props: ({ data }) => {
            const {getPlans} = data.management || {};
            const {edges=[], totalCount=0} = getPlans || {};
                return {
                    items: edges,
                    total: totalCount,
                    loading: data.loading,

                    doSearch(search) {
                        return data.fetchMore({
                            variables: {
                                search: search,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                if (!fetchMoreResult) { return previousResult; }
                                return (fetchMoreResult);
                            },
                        });
                    }
                }
        },

    }
);

export const ActionPlanSelect = withPlansSelectQuery(PlanSelect);
export default ActionPlanSelect;