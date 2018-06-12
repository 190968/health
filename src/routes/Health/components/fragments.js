import gql from 'graphql-tag';
import {ClinicalTrialFragment} from "../../Manager/components/ClinicalTrials/fragments";
import {ElementTreatmentFragment} from "../../Plan/components/Plan/fragments";

export const HealthElementFragment  = gql`
    fragment HealthElement on HealthRecord {
        id
        type
        title
        isActive
        typeText
        riskLevel
        isPrimary
        details {
            ... on Diagnosis {
              id
              code {
                id
                code
                name
              }
              date
              status
              notes
              __typename
            }
            ... on ClinicalTrial {
              ...ClinicalTrialInfo
            }
            ... on Treatment {
              ...TreatmentPlanElement
            }
       }
       createdDate
    }
    ${ClinicalTrialFragment}
    ${ElementTreatmentFragment}
`;


