import {compose, branch, withHandlers, withState, withProps} from 'recompose';
 import { graphql } from 'react-apollo';
 import gql from 'graphql-tag';
// import { ElementLinkFragment, ElementTextFragment, ElementTreatmentFragment, ElementOptionsFragment,
//     ElementClinicalNoteFragment} from "../../../../Plan/components/Plan/fragments";
// import {HealthElementFragment} from "../../../../Health/components/fragments";
//
//
// export const TumorboardElementFragment  = gql`
//     fragment TumorboardElementInfo on TumorboardElement {
//         id
//         activity {
//             ... on TimelineElementBasic {
//               id
//               text
//               __typename
//             }
//             ... on PlanElementLink {
//               ...LinkElement
//             }
//             ... on PlanElementText {
//               ...TextElement
//             }
//              ... on PlanElementClinicalNote {
//               ...ClinicalNoteElement
//             }
//             ... on Treatment {
//                 ...TreatmentPlanElement
//             }
//             ... on PlanElementChecklist {
//                   ...OptionsElement
//             }
//             ... on HealthRecord {
//                   ...HealthElement
//
//             }
//          }
//          type
//          typeText
//          notes
//          __typename
//     }
//      ${ElementLinkFragment}
//      ${ElementTextFragment}
//      ${ElementClinicalNoteFragment}
//      ${ElementTreatmentFragment}
//      ${ElementOptionsFragment}
//      ${HealthElementFragment}
// `;
//
// export const TumorboardSimpleFragment = gql`
//         fragment TumorboardSimpleInfo on Tumorboard {
//             id,
//             title,
//             lead {
//                 ...UserInfo
//             }
//             admin {
//                 ...UserInfo
//             }
//             location
//             video
//             notes
//             startDate
//             endDate
//             startTime
//             endTime
//             isOpen
//         }
//         ${UserInfoFragment}
// `;
// export const TumorboardFragment = gql`
//         fragment TumorboardInfo on Tumorboard {
//             ...TumorboardSimpleInfo
//         }
//         ${TumorboardSimpleFragment}
// `;
//
// export const TUMORBOARD_QUERY = gql`
//     query GET_TUMORBOARD ($id: UID!) {
//         health {
//             getCancer(id:$id) {
//                 ...CancerInfo
//             }
//         }
//     }
//     ${TumorboardFragment}
// `;
//
// const withQuery = graphql(
//     TUMORBOARD_QUERY,
//     {
//         options: ({tumorboard}) => {
//             return {
//                 variables: {
//                     id: tumorboard.id,
//                 }
//             }
//         },
//         props: ({ ownProps, data }) => {
//             const {tumorboard=ownProps.tumorboard} = data;
//             return {...ownProps, loading: data.loading, tumorboard}
//         },
//     }
// );
//
//
// // UPDATE TUMORBOARD
// const TUMORBOARD_UPDATE_MUTATION = gql`
//     mutation TumorboardUpdate($id: UID!, $input:TumorboardInput!){
//         tumorboardUpdate(id:$id, input:$input) {
//             ...TumorboardInfo
//         }
//     }
//     ${TumorboardFragment}
// `;
//
//
// const withMutationEdit = graphql(TUMORBOARD_UPDATE_MUTATION, {
//     props: ({ownProps:{tumorboard}, mutate }) => ({
//         onSubmit: (input) => {
//             return mutate({
//                 variables: { id: tumorboard.id, input: input},
//                 // refetchQueries: [{
//                 //     query: GET_CANCER_STAGES_QUERY,
//                 // }],
//             });
//         },
//     }),
// });
// const withQueryMutation = compose(withMutationEdit/*, withQuery*/);
//
//
//
// export const GET_PATIENT_TUMORBOARD_QUERY  = gql`
//     query GET_PATIENT_TUMORBOARD ($userId: UID!) {
//         getPatientTumorboard (userId:$userId) {
//             ...TumorboardInfo
//         }
//     }
//     ${TumorboardFragment}
// `;

// ADD tumorboard
const TREATMENT_PLAN_CREATE_MUTATION = gql`
      mutation CancerTreatmentPlan($input:TreatmentPlanInput!, $userId: UID!){
        treatmentPlanCreate(input:$input, userId:$userId) {
           id
        }
    }
`;
export const withAddMutation = graphql(TREATMENT_PLAN_CREATE_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        onSubmit: (input) => {
            return mutate({
                variables: {input:input, userId:ownProps.user.id},
                // refetchQueries: [{
                //     query: GET_PATIENT_TUMORBOARD_QUERY,
                //     variables: {userId:ownProps.userId},
                // }],
            });
        }
    })
});

export const withTreatmentPlanMutation = withAddMutation;//branch(props => props.tumorboard.id, withQueryMutation, withAddMutation);



// ADD TUMORBOARD ELEMENT
const TREATMENT_PLAN_ADD_ELEMENT_MUTATION = gql`
    mutation TreatmentPlanAddElement($id: UID!, $userId: UID!, $elementId:UID!, $notes: String){
        addTreatmentPlanElement(id:$id, userId:$userId, elementId:$elementId, notes:$notes) {
            id
        }
    }
`;


export const withTreatmentPlanAddElementMutation = graphql(TREATMENT_PLAN_ADD_ELEMENT_MUTATION, {
    props: ({ownProps, mutate }) => ({
        onAndElement: (id, elementId, notes) => {
            return mutate({
                variables: {id: id, userId:ownProps.user.id, elementId, notes},
                // refetchQueries: [{
                //     query: GET_PATIENT_TUMORBOARD_QUERY,
                //     variables: {id},
                // }],
            });
        },
    }),
});
