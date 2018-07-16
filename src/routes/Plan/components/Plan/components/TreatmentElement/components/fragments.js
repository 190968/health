import gql from 'graphql-tag';


const StringUnitsFragment  = gql`
fragment StringUnitsInfo on StringUnits {
    value
    units
}
`;

export const TreatmentElementFragment = gql`
        fragment TreatmentElementInfo on TreatmentElement {
            id
            type
            description
            notes
            element {
                id
                info {
                    ... on PlanElementChecklist {
                        id
                        label
                        options {
                            value
                            label
                        }
                    }
                    

                    ... on PlanElementChemotherapy {
                        id
                        chemotherapy {
                            id
                            title
                        }
                        cycles
                        days
                        timesPerDay
                    }

                    ... on ClinicalTrialElement {
                        id
                        trial {
                            id
                            title
                        }
                        cohort
                        sponsor
                        
                    }

                    ... on Oncology {
                        id
                        diagnosis {
                            id
                            code
                            name
                        }
                        type
                        disorder
                        behaviour
                        organSystem
                        anatomicSite
                      }
                      ... on Radiation {
                        id
                        treatmentAnatomicSite
                        treatmentTechnique
                        regionalModality
                        regionalDose {
                            ...StringUnitsInfo
                        }
                        regionalFractions
                      }
                      ... on Radiology {
                        id
                        CPTcode
                        tumorSize {
                            ...StringUnitsInfo
                        }
                        regionalLymphNodes
                        metastaticSites
                      }
                      ... on Pathology {
                        id
                        tumorHistology
                        tumorBehavior
                        tumorGrade
                        tumorSize {
                            ...StringUnitsInfo
                        }
                      }

                    
                }
            }
             
        }

        ${StringUnitsFragment}
`;
