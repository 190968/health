import gql from 'graphql-tag';
import {
    ElementLinkFragment, ElementTextFragment, ElementTreatmentFragment, ElementOptionsFragment,
    ElementClinicalNoteFragment
} from "../../../../../../../Plan/components/Plan/fragments";
import {HealthElementFragment} from "../../../../../../../Health/components/fragments";
export const TimelineElementActivityFragment  = gql`
    fragment TimelineElementActivity on TimelineElement {
        activity {
            ... on TimelineElementBasic {
              id
              text
              __typename
            }
            ... on PlanElementLink {
              ...LinkElement
            }
            ... on PlanElementText {
              ...TextElement
            }
             ... on PlanElementClinicalNote {
              ...ClinicalNoteElement
            }
            ... on Treatment {
                ...TreatmentPlanElement
            }
            ... on PlanElementChecklist {
                  ...OptionsElement
            }
            ... on HealthRecord {
                  ...HealthElement
                  
            }
            
            __typename
        }
    }
     ${ElementLinkFragment}
     ${ElementTextFragment}
     ${ElementClinicalNoteFragment}
     ${ElementTreatmentFragment}
     ${ElementOptionsFragment}
     ${HealthElementFragment}
`;

export const TimelineElementFragment = gql`
        fragment TimelineElement on TimelineElement {
          id
          type
          typeText
          ...TimelineElementActivity
          date
          notes
          isCritical
          createdAt
          creator {
            id,
            fullName
          }
          source
        }
        ${TimelineElementActivityFragment}
    `;

