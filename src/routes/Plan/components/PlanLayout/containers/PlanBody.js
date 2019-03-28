import PlanBody from '../components/PlanBody';
import {PlanCardFragment, PlanElementFragment, PlanElementPureFragment} from '../../../../Plan/components/Plan/fragments';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';
// import { validateBrahms, getNextObjectFromRules } from '../../../../../components/Brahms/utils';
// import { prepareSkippedPlanElementsByNextId } from '../../../../../components/Plan/utils';



export const PLAN_BODY_QUERY = gql`
    query GET_PLAN_BODY ($id: UID!, $upid: UID!, $date: Date!) {
        plan (id: $id) {
            ...PlanCardInfo,
            upid
            getBody {
                ... on PlanBodyVideo {
                    html
                    text
                }
            }
            lessons {
                id
                title
                completed
                elements {
                    ...PlanElement,
                }
            }
            activities(date:$date) @connection(key: "planActivities", filter: ["date"]) {
                id
                title
                completed(date:$date, upid:$upid) @connection(key: "planActivitiesCompletion", filter: ["date", "upid"]) 
                elements {
                    ...PlanElementWithReports,
                }
            }            
            intro {
                 ...PlanElement,
            }

        }
    }
    ${PlanCardFragment}
    ${PlanElementFragment}
    ${PlanElementPureFragment}
`;


// 1- add queries:
const injectPlanBodyQuery = graphql(
    PLAN_BODY_QUERY,
    {
        options: (ownProps) => {
            return {
                variables: {
                    id: ownProps.plan.id,
                    upid: ownProps.upid,
                    date: ownProps.date
                },
                fetchPolicy: 'network-only'
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
                    loading: data.loading,
                    lessons: lessons,
                    activities: activities,
                    intro: intro,
                    plan: plan,

                    loadDate(date) {
                        return data.refetch({
                            date: date,
                        });
                    }
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
);


// const enhance = compose(
//     ,
// );
export default injectPlanBodyQuery(PlanBody);



