 import { graphql } from 'react-apollo';
 import gql from 'graphql-tag';
 import {TreatmentPlanFullFragment} from './fragments';
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
export const TREATMENT_PLAN_QUERY = gql`
    query GET_TREATMENT_PLAN ($id: UID!) {
        getTreatmentPlan (id:$id) {
            ...TreatmentPlanFullInfo
        }
    }
    ${TreatmentPlanFullFragment}
`;

export const withTreatmentPlanQuery = graphql(
    TREATMENT_PLAN_QUERY,
    {
        options: ({treatmentPlan}) => {
            return {
                variables: {
                    id: treatmentPlan.id,
                }
            }
        },
        props: ({ ownProps, data }) => {
            const {getTreatmentPlan:treatmentPlan=ownProps.treatmentPlan, loading} = data;
            return {...ownProps, loading, treatmentPlan}
        },
    }
);
