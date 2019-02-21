

/*  This is a containers components. Notice it does not contain any JSX,
    nor does it import React. This components is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    components - in this case, the counter:   */

import PlanLayout from '../../Plan/components/PlanLayout'
import {PLAN_TOUR_STEPS} from '../../Plan/components/PlanLayout/components/PlanBody'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import queryString from 'query-string';
import {withRouter} from 'react-router-dom'
import { PlanCardFragment } from '../components/Plan/fragments';
import { UserInfoFragment } from '../../User/fragments';
import { compose, withProps, withHandlers } from 'recompose';

const CURRENT_PERSONAL_PLAN = gql`
    query GET_USER_PLAN ($upid: UID!) {
        userPlan (upid: $upid) {
            id
            joinDate
            startDate
            endDate
            privacy
            canEdit
            isCompleted
            plan {
                ...PlanCardInfo
                isFixedDated
            }
            user {
               ...UserInfo
            }
        }
    }
    ${PlanCardFragment}
    ${UserInfoFragment}
`;


// 1- add queries:
const withQuery = graphql(
    CURRENT_PERSONAL_PLAN,
    {
        options: (ownProps) => ({
            variables: {
                upid: ownProps.match.params.upid
            }

        }),
        props: ({ ownProps, data }) => {

            if (!data.loading) {


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
);


const enhance = compose(
    withQuery,
    withRouter,
    withProps(props => {
        const {location} = props;
        const {search} = location || {};
        var parsedUrl = queryString.parse(search);
        const {tour} = parsedUrl || {};
        return {
            showTour: tour === '1'
        }
    }),
    withHandlers({
        handleTourCallback: ownProps => (props) => {
            const {action, index} = props;
            const { history} = ownProps;
            console.log(props, 'joyprops');
            if (action === 'update') {
              const step = PLAN_TOUR_STEPS[index] || null;
              const {url} = step || {};
              if (url) {
                history.push(url);
              }
            }
        }
    })
)
export default enhance(PlanLayout);