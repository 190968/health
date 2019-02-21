import gql from 'graphql-tag';

export const DrugInfoFragment = gql`
fragment DrugInfo on MedicationDrug {
    name
                    dosage
                    id
                    form
}
`;  
export const MedicationInfo = gql`
            fragment MedicationInfo on Medication {
                id
                drug {
                    ...DrugInfo
                }
                type
                timesPerDay
                quantity
                directions
                purpose
                sideEffects
                image
                isPersonal
                startDate
                endDate
                prescription
            }
            ${DrugInfoFragment}
            `;
export const MedicationReportInfoFragment = gql`
fragment MedicationReportInfo on MedicationReport {
        id
        time
        date
        isTaken
        order
        reportedOn
}
`;        
export const MedicationCardInfo = gql`
            fragment MedicationCardInfo on Medication {
                ...MedicationInfo
                reports (date: $date)  @connection(key: "medReport", filter: ["date"])  {
                    ...MedicationReportInfo
                }
            }
            ${MedicationInfo}
            ${MedicationReportInfoFragment}
            `;
export const MedicationSummary = gql`  
            fragment MedicationSummary on Medication {
                summary (date:$date, userId:$userId)  {
                    date
                    reportsNeeded
                    reports {
                        id
                        isTaken
                    }
                }
            }
            
        `;

export const MedicationsByType =gql`  
 fragment MedicationsByType on MedicationPlan {
    medicationsByType (date: $date) {
        takeAtTimes {
        ...MedicationCardInfo
            timesPerHour {
                id
                time
                quantity
            }
        }
        takeDaily {
        ...MedicationCardInfo
        }
        takeAsNeeded {
        ...MedicationCardInfo
        }
    } 
}
${MedicationCardInfo}
`;