import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {PlanElementPureFragment, PlanElementReportFragment} from "../../../../Plan/fragments";


export const GET_PLAN_ELEMENT_QUERY = gql`
    query GET_PLAN_ELEMENT ($id: UID!, $planId: UID!) {
        planElement (id: $id, planId:$planId) {
            ...PlanElement
        }
    }
    ${PlanElementPureFragment}
`;

export const PLAN_ELEMENT_CHILDREN_QUERY = gql`
    query GET_PLAN_ELEMENT_CHILDREN ($id: UID!, $planId: UID!, $userId: UID, $elementValue: UID) {
        planElement (id: $id, planId: $planId) {
            id
            childrenElements (elementValue:$elementValue) {
                ...PlanElement
                reports (user_id: $userId)  {
                    ...PlanElementReport
                }
            }
        }
    }
    ${PlanElementPureFragment}
    ${PlanElementReportFragment}
`;




// 1- add queries:
export const PlanElementChildrenListWithQuery = graphql(
    PLAN_ELEMENT_CHILDREN_QUERY,
    {
        options: (ownProps) => {
            const {user, plan} = ownProps;
            const {id:planId} = plan || {};
            const {id:userId} = user || {};
            return {
                variables: {
                    id: ownProps.elementId,
                    planId,
                    userId,
                    elementValue: ownProps.elementValue
                },
                fetchPolicy: 'network-only'
            }
        },
        props: ({ownProps,  data }) => {
            console.log(ownProps);
            console.log(data);
            if (!data.loading) {
                const planElement = data.planElement || {};
                const {childrenElements=[]} = planElement || {};

                return {
                    //upid: data.plan.upid,
                    //modules: data.network.modules,
                    loading: data.loading,
                    //id: plan.id,
                    elements: childrenElements,

                    loadDate(date) {

                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
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