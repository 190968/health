import { connect } from 'react-redux'

/*  This is a containers components. Notice it does not contain any JSX,
    nor does it import React. This components is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    components - in this case, the counter:   */

import PlanBody from '../components/PlanBody'
// gragement
import Plan from '../../../../Plan/components/Plan';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';



export const PLAN_BODY_QUERY = gql`
    query GET_PLAN_BODY ($id: ID!, $upid: ID!, $date: Date!) {
        plan (id: $id) {
            ...PlanCardInfo,
            upid,
            lessons {
                id
                title
                completed
                elements {
                    ...PlanElement,
                }
            }

            activities(date:$date) {
                id
                title
                completed(date:$date, upid:$upid)
                elements {
                    ...PlanElement,
                }
            }
            
            intro {
                 ...PlanElement,
            }

        }
    }
    ${Plan.fragments.plan}
    ${Plan.fragments.element}
`;


// 1- add queries:
const PlanBodyWithQuery = graphql(
    PLAN_BODY_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                id: ownProps.id,
                upid: ownProps.upid,
                date: ownProps.date
            }

        }),
        props: ({ ownProps, data }) => {

            if (!data.loading) {
                const plan = data.plan;
                //const body = plan.body;
                const lessons = plan.lessons || [];
                const activities = plan.activities || [];
                const intro = plan.intro || [];
                return {
                    //upid: data.plan.upid,
                    //modules: data.network.modules,
                    loading: data.loading,
                    //id: plan.id,
                    lessons: lessons,
                    activities: activities,
                    intro: intro,

                    loadDate(date) {

                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
                            variables: {
                                // We are able to figure out which offset to use because it matches
                                // the feed length, but we could also use state, or the previous
                                // variables to calculate this (see the cursor example below)
                                //id: ownProps.id,
                                //upid: ownProps.upid,
                                date: date,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                //return {medicationPlan:{id:29}};

                                //fetchMoreResult.date = date;
                                if (!fetchMoreResult) { return previousResult; }
                                return fetchMoreResult;
                                return Object.assign({}, previousResult, {
                                    medicationPlan: fetchMoreResult.medicationPlan,
                                });
                            },
                        });
                    }
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
)(PlanBody);
/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
    return {
        // view store:
        //currentView:  state.views.currentView,
        // userAuth:
        //plan: state.plan,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        //increment: (info) => {dispatch(increment(info))},
        //doubleAsync
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlanBodyWithQuery);