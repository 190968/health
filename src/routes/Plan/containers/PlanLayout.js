import { connect } from 'react-redux'
import { compose } from 'react-apollo'

/*  This is a containers components. Notice it does not contain any JSX,
    nor does it import React. This components is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    components - in this case, the counter:   */

import PlanLayout from '../../Plan/components/PlanLayout'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Plan from '../../Plan/components/Plan';

const CURRENT_PERSONAL_PLAN = gql`
    query GET_USER_PLAN ($upid: ID!) {
        userPlan (upid: $upid) {
            id
            joinDate
            plan {
            ...PlanCardInfo
            }
           user {
           id
           first_name
           last_name
           }

        }
    }
    ${Plan.fragments.plan}
`;


// 1- add queries:
const PlanstorPlanLayoutWithQuery = graphql(
    CURRENT_PERSONAL_PLAN,
    {
        options: (ownProps) => ({
            variables: {
                upid: ownProps.match.params.upid
            }

        }),
        props: ({ ownProps, data }) => {
            //console.log(ownProps);
            //console.log(CURRENT_PLANSTORE_PLAN);
            if (!data.loading) {
                //console.log(ownProps);

                return {
                    info: data.userPlan,
                    plan: data.userPlan.plan,
                    user: data.userPlan.user,
                    //modules: data.network.modules,
                    loading: data.loading,
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
)(PlanLayout);

const deletePlan = gql`
    mutation userPlanDelete($upid:ID!) {
       userPlanDelete(upid:$upid)
    }

`;
const withMutationDelete = graphql(deletePlan,
    {
        props: ({ ownProps, mutate }) => ({
            deletePlan: upid => {
                return mutate({
                    variables: { upid: upid},
                })
            },
        }),
    }
);


const completePlan = gql`
    mutation userPlanComplete($upid:ID!) {
       userPlanComplete(upid:$upid)
    }

`;
const withMutationComplete = graphql(completePlan,
    {
        props: ({ ownProps, mutate }) => ({
            completePlan: input => {
                console.log(ownProps);
                return mutate({
                    variables: { upid: ownProps.info.id},
                })
            },
        }),
    }
);

const PlanLayoutWithMutations = compose(
    withMutationDelete,
    withMutationComplete,
);
/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
    return {
        // view store:
        //currentView:  state.views.currentView,
        // userAuth:
        upid:0,
        //plan: state.plan,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        //increment: (info) => {dispatch(increment(info))},
        //doubleAsync
    }
};


export default PlanLayoutWithMutations(connect(
    mapStateToProps,
    mapDispatchToProps
)(PlanstorPlanLayoutWithQuery));