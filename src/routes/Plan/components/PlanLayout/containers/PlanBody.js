import { connect } from 'react-redux'
import PlanBody from '../components/PlanBody';
import {compose, withHandlers, withState} from 'recompose';
// gragement
import {PlanCardFragment, PlanElementFragment} from '../../../../Plan/components/Plan/fragments';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';



export const PLAN_BODY_QUERY = gql`
    query GET_PLAN_BODY ($id: UID!, $upid: UID!, $date: Date!) {
        plan (id: $id) {
            ...PlanCardInfo,
            upid
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
    ${PlanCardFragment}
    ${PlanElementFragment}
`;


// 1- add queries:
const PlanBodyWithQuery = graphql(
    PLAN_BODY_QUERY,
    {
        options: (ownProps) => {
            console.log(ownProps);
            return {
                variables: {
                    id: ownProps.plan.id,
                    upid: ownProps.upid,
                    date: ownProps.date
                }
            }
        },
        props: ({  data }) => {
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
                            variables: {
                                date: date,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                if (!fetchMoreResult) { return previousResult; }
                                return fetchMoreResult;
                            },
                        });
                    }
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
);
 
const enhance = compose(
    PlanBodyWithQuery,
    //withState('', ''),
);

export default enhance(PlanBody);