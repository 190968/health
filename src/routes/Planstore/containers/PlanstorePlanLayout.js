import { connect } from 'react-redux'
import { increment, doubleAsync } from '../modules/planstore'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import PlanstorPlanLayout from '../components/PlanstorePlanLayout'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Plan from '../../Plan/components/Plan';


const CURRENT_PLANSTORE_PLAN = gql`
    query GET_PLANSTORE_PLAN ($pid: ID!) {
            plan (pid: $pid) {
                ...PlanCardInfo,
                description,
                benefits,
                start_date,
                end_date,
                gender,
                elements,
                language,
                categories {
                    id,
                    name
                },
                
            }
    }
    ${Plan.fragments.plan}
`;


// 1- add queries:
const PlanstorPlanLayoutWithQuery = graphql(
    CURRENT_PLANSTORE_PLAN,
    {
      options: (ownProps) => ({
        variables: {
          pid: ownProps.match.params.pid
        }

      }),
        props: ({ ownProps, data }) => {
        //console.log(ownProps);
          //console.log(CURRENT_PLANSTORE_PLAN);
          if (!data.loading) {
            //console.log(ownProps);

            return {
              plan: data.plan,
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
)(PlanstorPlanLayout);
/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
    return {
        // view store:
        //currentView:  state.views.currentView,
        // userAuth:
        pid:0,
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
)(PlanstorPlanLayoutWithQuery);