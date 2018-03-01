import PlanBody from '../../../../Plan/components/PlanLayout/components/PlanBody';
import Plan from '../../../../Plan/components/Plan';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';



const PB_PLAN_BODY_QUERY = gql`
    query PB_PLAN_BODY ($id: UID!, $date: Date!) {
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
            activities {
                id
                title
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
    PB_PLAN_BODY_QUERY,
    {
        options: (ownProps) => {
            console.log(ownProps);
            return {

            variables: {
                id: ownProps.plan.id,
                date: ''
            }}

        },
        props: ({ ownProps, data }) => {
            console.log(ownProps);
            console.log(data);
            if (data.plan && !data.loading) {
                const plan = data.plan;
                //const body = plan.body;
                const lessons = plan.lessons || [];
                const activities = plan.activities || [];
                const intro = plan.intro || [];
                return {
                    //upid: data.plan.upid,
                    //modules: data.network.modules,
                    loading: data.loading,
                    planId: plan.id,
                    lessons: lessons,
                    activities: activities,
                    intro: intro,
                }

            } else {
                return {loading: data.loading, lessons:[], activities:[], intro:[]}
            }
        },
    }
)(PlanBody);

export default PlanBodyWithQuery;