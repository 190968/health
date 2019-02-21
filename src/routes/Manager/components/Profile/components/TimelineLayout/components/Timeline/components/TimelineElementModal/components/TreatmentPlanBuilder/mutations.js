import {compose, branch, withHandlers, withState, withProps} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {withTreatmentPlanQuery, TREATMENT_PLAN_QUERY} from './queries';
import { TreatmentPlanFragment } from './fragments';



// UPDATE
const TREATMENT_PLAN_UPDATE_MUTATION = gql`
    mutation TumorboardUpdate($id: UID!, $input:TreatmentPlanInput!){
        treatmentPlanUpdate(id:$id, input:$input) {
            ...TreatmentPlanInfo
        }
    }
    ${TreatmentPlanFragment}
`;

const withMutationEdit = graphql(TREATMENT_PLAN_UPDATE_MUTATION, {
    props: ({ownProps:{treatmentPlan}, mutate }) => ({
        onSubmit: (input) => {
            return mutate({
                variables: { id: treatmentPlan.id, input: input},
            });
        },
    }),
});
const withQueryMutation = compose(withTreatmentPlanQuery, withMutationEdit);


// ADD
const TREATMENT_PLAN_CREATE_MUTATION = gql`
      mutation CancerTreatmentPlan($input:TreatmentPlanInput!, $userId: UID!){
        treatmentPlanCreate(input:$input, userId:$userId) {
           ...TreatmentPlanInfo
        }
    }
    ${TreatmentPlanFragment}
`;
export const withAddMutation = graphql(TREATMENT_PLAN_CREATE_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        onSubmit: (input) => {
            return mutate({
                variables: {input:input, userId:ownProps.user.id},
            });
        }
    })
});

export const withTreatmentPlanMutation = branch(props => props.treatmentPlan.id, withQueryMutation, withAddMutation);



// ADD  ELEMENT
const TREATMENT_PLAN_ADD_ELEMENT_MUTATION = gql`
    mutation TreatmentPlanAddElement($id: UID!, $userId: UID!, $elementId:UID!, $notes: String){
        addTreatmentPlanElement(id:$id, userId:$userId, elementId:$elementId, notes:$notes) {
            id
        }
    }
`;

export const withTreatmentPlanAddElementMutation = graphql(TREATMENT_PLAN_ADD_ELEMENT_MUTATION, {
    props: ({ownProps, mutate }) => ({
        onAndElement: (id, elements) => {
            return mutate({
                variables: {id: id, elements},
                refetchQueries: [{
                    query: TREATMENT_PLAN_QUERY,
                    variables: {id},
                }],
            });
        },
    }),
});
