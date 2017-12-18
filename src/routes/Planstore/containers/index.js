import { connect } from 'react-redux'
import PlanstoreLayout  from '../components/PlanstoreLayout'
import CheckBox  from '../components/PlanstoreLayout/components/Filter/components/CheckBox'
import Plan from '../../Plan/components/Plan';


import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {setFilters} from '../modules'
import { loadUser} from '../../User/modules/user'

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
        options: (ownProps) => ({

            variables: {
                filters:ownProps.activeFilters,
                page: ownProps.page,
                limit: PLANS_PER_PAGE,
            },
            fetchPolicy: 'network-only'

        }),
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                //console.log(data.planstore.filters,"Какой filter в props");
                return {
                    plans: data.planstore.plans,
                    filters: data.planstore.filters,
                    loading: data.loading,


                    loadMoreEntries(page) {
                        console.log("Какой page в props",page);
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
)(PlanstoreLayout);

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
    //console.log(state.planstore);
    var activeFilters = state.planstore.get('activeFilters').toJS();
    var plans = state.planstore.get('plans').toJS();
    var page = state.planstore.get('page');
    //console.log(state);
    return {
        plans: plans,
        activeFilters: activeFilters,
        page: page,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateFilterStore: (info)  => {
        //
        /*console.log(info);
        console.log(this.props);
        console.log(ownProps);*/
        //console.log(setFilters);
        dispatch(setFilters(info))
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlanstoreLayoutWithQuery);