/**
 * Created by Pavel on 20.12.2017.
 */
import { connect } from 'react-redux'
import Content  from '../components'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const QUERY = gql`
     query GET_PLANSTORE_DASH ($filters: Json, $page: Int!, $limit: Int) {
        planstore {
            plans (filters: $filters, page: $page, limit: $limit) {
                ...PlanCardInfo
            }
          }
    }
    
`;

const PLANS_PER_PAGE = 20;

// 1- add queries:
const PlanstoreLayoutWithQuery = graphql(
    QUERY,
    {
        options: (ownProps) => ({

            variables: {
                filters:ownProps.activeFilters,
                page: ownProps.page,
                limit: PLANS_PER_PAGE,
            },
            //fetchPolicy: 'network-only'

        }),
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                //  console.log(data.planstore.filters);
                return {

                    plans: data.planstore.plans,
                    filters: data.planstore.filters,
                    loading: data.loading,


                    loadMoreEntries(page) {
                        //console.log("Какой page в props",page);
                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
                            variables: {
                                // We are able to figure out which offset to use because it matches
                                // the feed length, but we could also use state, or the previous
                                // variables to calculate this (see the cursor example below)
                                page: page,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                console.log("Какой previousResult в updateQuery",previousResult);
                                if (!fetchMoreResult) { return previousResult; }
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
)(Content);

/* -----------------------------------------
 Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
    var activeFilters = state.planstore.get('activeFilters').toJS();
    var plans = state.planstore.get('plans').toJS();
    var page = state.planstore.get('page');
    return {
        plans: plans,
        activeFilters: activeFilters,
        page: page,
    };
};


export default connect(
    mapStateToProps
)(PlanstoreLayoutWithQuery);