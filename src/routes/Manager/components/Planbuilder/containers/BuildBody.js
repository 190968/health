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
                                /*return Object.assign({}, previousResult, {
                                    medicationPlan: fetchMoreResult.medicationPlan,
                                });*/
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

export default PlanBodyWithQuery;