import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PlanElementChildrenManager from '../components/PlanElementChildrenManager';
import {PlanElementPureFragment} from "../../../../../../Plan/fragments";
import {PLAN_ELEMENT_CHILDREN_QUERY} from "../../../containers/queries";


const addChildElementMutation = gql`
    mutation addChildElement($parentId: UID!, $parentValue: UID!, $planId: UID!, $type:PlanElementEnum!,$input:PlanBodyElementInput!) {
        addPlanChildElement(planId: $planId, type:$type, parentId: $parentId, parentOptionId:$parentValue, input: $input) {
            planElement {
                ...PlanElement
            }
        }
    }
    ${PlanElementPureFragment}
`;

 export const withPlanAddChildElementMutation = graphql(addChildElementMutation, {
    props: ({ ownProps, mutate }) => ({
        addChildElement: (input, type) => {
            return mutate({
                variables: {planId:ownProps.plan.id, type:type, parentId:ownProps.parentId, parentValue:ownProps.parentValue, input:input},
                refetchQueries: [{
                    query: PLAN_ELEMENT_CHILDREN_QUERY,
                    variables: {id:ownProps.parentId, planId:ownProps.plan.id, elementValue:ownProps.parentValue}
                }]
            })
        },
    }),
});


export default withPlanAddChildElementMutation(PlanElementChildrenManager);
