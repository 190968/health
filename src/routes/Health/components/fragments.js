import gql from 'graphql-tag';
import {ElementTreatmentFragment} from "../../Plan/components/Plan/fragments";
import { UserInfoFragment } from '../../User/fragments';

export const StringUnitsFragment  = gql`
    fragment StringUnitsInfo on StringUnits {
        value
        units
    }
`;

export const ClinicalTrialElementFragment  = gql`
    fragment ClinicalTrialElementInfo on ClinicalTrialElement {
        id
        trial {
            id
            nctId
            title
        }
        cohort
        sponsor
    }
`;
export const ICD10Fragment  = gql`
    fragment ICD10Info on Icd10Code {
        id
        code
        name
    }
`;

export const DiagnosisFragment  = gql`
    fragment DiagnosisInfo on Diagnosis {
        id
        code {
            ...ICD10Info
        }
        date
        status
    }
     ${ICD10Fragment}
`;

export const OncologyFragment  = gql`
    fragment OncologyInfo on Oncology {
        id
        diagnosis {
            ...ICD10Info
        }
        type
        disorder
        behavior
        organSystem
        anatomicSite
    }
    ${ICD10Fragment}
`;

export const RadiationFragment  = gql`
    fragment RadiationInfo on Radiation {
        id
        treatmentAnatomicSite
        treatmentTechnique
        regionalModality
        regionalDose {
            ...StringUnitsInfo
        }
        regionalFractions
    }
    ${StringUnitsFragment}
`;

export const RadiologyFragment  = gql`
    fragment RadiologyInfo on Radiology {
        id
        procedure {
            id
            hcpc
            name
        }
        tumorSize {
            ...StringUnitsInfo
        }
        regionalLymphNodes
        metastaticSites
    }
     ${StringUnitsFragment}
`;

export const PathologyFragment  = gql`
    fragment PathologyInfo on Pathology {
        id
        tumorHistology
        tumorBehavior
        tumorGrade
        tumorSize {
            ...StringUnitsInfo
        }
    }
     ${StringUnitsFragment}
`;

export const AllergyFragment  = gql`
    fragment AllergyInfo on Allergy {
        id
        title
        treatment
        reaction
        severity
        date
        notes
    }
`;

export const HealthChemotherapyFragment  = gql`
    fragment ChemotherapyInfo on PlanElementChemotherapy {
        id
        chemotherapy {
            id
            title
        }
        cycles
        days
        timesPerDay
    }
`;



export const TreatmentElementFragment = gql`
        fragment TreatmentElementInfo on TreatmentElement {
            id
            type
            description
            notes
            element {
                    ... on PlanElementChecklist {
                        id
                        label
                        options {
                            id
                            label
                        }
                    }
                    ... on ClinicalTrialElement {
                        ...ClinicalTrialElementInfo
                    }
                    ... on Oncology {
                        ...OncologyInfo
                    }
                    ... on Radiation {
                        ...RadiationInfo
                    }
                    ... on Radiology {
                        ...RadiologyInfo
                    }
                    ... on Pathology {
                        ...PathologyInfo
                    }
                    ... on PlanElementChemotherapy {
                        ...ChemotherapyInfo
                    }

                    
            }
             
        }

        ${OncologyFragment}
        ${RadiationFragment}
        ${RadiologyFragment}
        ${PathologyFragment}
        ${HealthChemotherapyFragment}
        ${ClinicalTrialElementFragment}
`;

export const TreatmentInfoFragment = gql`
    fragment TreatmentInfo on Treatment {
          id
          title
          elements {
                ...TreatmentElementInfo
          }
    }
   ${TreatmentElementFragment}
`;


export const HealthElementFragment  = gql`
    fragment HealthElement on HealthRecord {
        id
        healthType
        title
        isActive
        typeText
        healthTypeTxt
        riskLevel
        isPrimary
        date
        notes
        details {
            ... on Diagnosis {
                ...DiagnosisInfo
            }
            ... on Allergy {
                ...AllergyInfo
            }
             ... on ClinicalTrialElement {
              ...ClinicalTrialElementInfo
            }
            ... on Treatment {
              ...TreatmentInfo
            }
            ... on Oncology {
              ...OncologyInfo
            }
            ... on Radiation {
              ...RadiationInfo
            }
            ... on Radiology {
              ...RadiologyInfo
            }
            ... on Pathology {
              ...PathologyInfo
            }
            ... on PlanElementChemotherapy {
              ...ChemotherapyInfo
            }
       }
       createdDate
       createdBy {
           ...UserInfo
       }
    }
    
    
    ${OncologyFragment}
    
    ${DiagnosisFragment}
    ${AllergyFragment}
    ${ClinicalTrialElementFragment}
    ${TreatmentInfoFragment}
    ${RadiationFragment}
    ${RadiologyFragment}
    ${PathologyFragment}
    ${HealthChemotherapyFragment}
    
    ${UserInfoFragment}
`;



