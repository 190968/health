import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PlanElementChildrenManager from '../components/PlanElementChildrenManager';
import {PlanElementPureFragment} from "../../../../../../Plan/fragments";
import {PLAN_ELEMENT_CHILDREN_QUERY, PATHWAY_CONNECTED_ELEMENTS_QUERY} from "../../../containers/queries";
import { branch } from 'recompose';


const addChildElementMutation = gql`
    mutation addChildElement($parentId: UID!, $parentValue: UID!, $planId: UID!, $type:PlanElementEnum!,$input:PlanBodyElementInput!, $isPathway: Boolean!) {
        addPlanChildElement(planId: $planId, type:$type, parentId: $parentId, parentOptionId:$parentValue, input: $input) {
            
            pathway @include(if: $isPathway) {
                id
                getConnectedElements   {
                    parentId
                    parentValue
                    element {
                        ...PlanElement
                    }
                }
            }
            plan @skip(if: $isPathway) {
                id
            }
            planElement @skip(if: $isPathway) {
                ...PlanElement
            }
        }
    }
    ${PlanElementPureFragment}
`;


 export const withPlanAddChildElementMutation = graphql(addChildElementMutation, {
    props: ({ ownProps, mutate }) => ({
        addChildElement: (input, type) => {
            const {plan, parentId} = ownProps;
            const {id:planId, type:planType} = plan || {};
            const isPathway = planType === 'pathway';
            let refetchQueries = [];

            // if (isPathway) {
            //     refetchQueries.push({
            //         query: PATHWAY_CONNECTED_ELEMENTS_QUERY,
            //         variables: {id: planId}
            //     });
            // } else {
            //     // {
            //     //     query: PLAN_ELEMENT_CHILDREN_QUERY,
            //     //     variables: {id:ownProps.parentId, planId:ownProps.plan.id, elementValue:ownProps.parentValue}
            //     // }
            // }
            return mutate({
                variables: {planId, type:type, parentId:parentId, parentValue:ownProps.parentValue, input:input, isPathway},
                refetchQueries
            })
        },
    }),
});


export default withPlanAddChildElementMutation(PlanElementChildrenManager);
