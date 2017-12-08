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



const PLAN_BODY = gql`
    query GET_PLAN_BODY ($id: ID!) {
        plan (id: $id) {
            ...PlanCardInfo,
            upid,
            body {

                lessons {
                    id
                    title
                    completed
                    elements {
                        id
                        item_id
                        item_type
                        item_info
                        schedule {
                            start_date
                            end_date
                            relative_start_date
                            relative_end_date
                            repeated_days
                        }
                    }
                }

                activities {
                    id
                    title
                    completed
                    elements {
                        id
                        item_id
                        item_type
                        item_info
                        schedule {
                            start_date
                            end_date
                            relative_start_date
                            relative_end_date
                            repeated_days
                        }
                    }
                }
                
                intro {
                    id
                    item_id
                    item_type
                    item_info
                    schedule {
                        start_date
                        end_date
                        relative_start_date
                        relative_end_date
                        repeated_days
                    }
                }
            }

        }
    }
    ${Plan.fragments.plan}
`;


// 1- add queries:
const PlanBodyWithQuery = graphql(
    PLAN_BODY,
    {
        options: (ownProps) => ({
            variables: {
                id: ownProps.id
            }

        }),
        props: ({ ownProps, data }) => {
            //console.log(data);
            //console.log(CURRENT_PLANSTORE_PLAN);
            if (!data.loading) {
                const plan = data.plan;
                const body = plan.body;
                const lessons = body.lessons;
                const activities = body.activities;
                const intro = body.intro;

                return {
                    upid: data.plan.upid,
                    //modules: data.network.modules,
                    loading: data.loading,
                    body: body,
                    lessons: lessons,
                    activities: activities,
                    intro: intro
                    /*increment() {
                         ownProps.increment(data.plans['actionplans']);
                    },
                    doubleAsync() {
                         // reset list of plans
                        ownProps.increment([]);
                    }*/
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