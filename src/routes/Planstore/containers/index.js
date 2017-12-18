import { connect } from 'react-redux'
import PlanstoreLayout  from '../components/PlanstoreLayout'

import Plan from '../../Plan/components/Plan';


import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
    query GET_PLANSTORE_PLANS ($filters: Json, $page: Int!, $limit: Int) {
        planstore {
            plans (filters: $filters, page: $page, limit: $limit) {
                ...PlanCardInfo
            }
            filters {
                code
                name
                fields {
                    type
                    text
                    value
                }
            }
        }
    }
    ${Plan.fragments.plan}
`;

const PLANS_PER_PAGE = 20;

// 1- add queries:
const PlanstoreLayoutWithQuery = graphql(
    QUERY,
    {
        //name: 'PlanstorePlans',
        options: (ownProps) => ({
            variables: {
                filters:ownProps.filters,
                page: ownProps.page,
                limit: PLANS_PER_PAGE,
            },
            fetchPolicy: 'network-only'

        }),
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                return {
                    plans: data.planstore.plans,
                    filters: data.planstore.filters,
                    loading: data.loading,


                    loadMoreEntries(page) {
                        //console.log(ownProps.page);
                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
                            variables: {
                                // We are able to figure out which offset to use because it matches
                                // the feed length, but we could also use state, or the previous
                                // variables to calculate this (see the cursor example below)
                                page: page,
                            },
                    updateQuery: (previousResult, {fetchMoreResult}) => {
                        if (!fetchMoreResult) { return previousResult; }
                        console.log(previousResult.planstore);
                        return fetchMoreResult;
                        return Object.assign({}, previousResult, {
                            // Append the new feed results to the old one
                            planstore: {plans: [...previousResult.planstore.plans, ...fetchMoreResult.planstore.plans]},
                        });
                    },
                    });
                }

                  }
        }

            else {
                return {loading: data.loading, plans: []}
            }
        },
    }
)(PlanstoreLayout);

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {

    var filters = state.planstore.get('filters').toJS();
    var plans = state.planstore.get('plans').toJS();
    var page = state.planstore.get('page');
    return {
        plans: plans,
        filters: filters,
        page: page,
    };
};

const mapDispatchToProps = (dispatch) => {
    //console.log(1);
    return {
        /*increment: (info) => {dispatch(increment(info))},
        doubleAsync*/
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlanstoreLayoutWithQuery);