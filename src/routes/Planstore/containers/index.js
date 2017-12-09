import { connect } from 'react-redux'
import PlanstoreLayout  from '../components/PlanstoreLayout'

import Plan from '../../Plan/components/Plan';


import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
    query GET_PLANSTORE_PLANS ($filters: [String], $page: Int!, $limit: Int) {
        planstore {
            plans (filters: $filters, page: $page, limit: $limit) {
                ...PlanCardInfo
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
                //console.log(ownProps);
                //
                return {
                    plans: data.planstore.plans,
                    //modules: data.network.modules,
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
                    /*increment() {
                         ownProps.increment(data.plans['actionplans']);
                    },
                    doubleAsync() {
                         // reset list of plans
                        ownProps.increment([]);
                    }*/
                }

            } else {
                return {loading: data.loading, plans: []}
            }
        },
    }
)(PlanstoreLayout);

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {

    var activeFilters = state.planstore.get('activeFilters').toJS();
    //console.log(activeFilters);
    var plans = state.planstore.get('plans').toJS();
    var page = state.planstore.get('page')
    //console.log(plans);
    return {
        plans: plans,
        filters: activeFilters,
        page: page,
        // view store:
        //currentView:  state.views.currentView,
        // userAuth:
        // filters: state.planstore.get('filters').toJS(),
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