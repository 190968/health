import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../User/fragments';


export const TrackerReportInfoFragment = gql`
            fragment TrackerReportInfo on TrackerReport {
                id
                date
                time
                reportedOn
                reportKey
                columnId
                isCritical
                value
                valueFormatted
                reporter {
                    ...UserInfo
                }
            }
            ${UserInfoFragment}
`;
export const TrackerSummaryReportInfoFragment = gql`
            fragment TrackerSummaryReportInfo on TrackerSummaryReport {
                id
                date
                time
                reportedOn
                reportKey
                columnId
                isCritical
                value
                reporter {
                    ...UserInfo
                }
            }
            ${UserInfoFragment}
`;


export const TrackerPureFragment = gql`
            fragment TrackerPure on Tracker {
                id
                label
                units {
                    id
                    name
                    getLabels
                }
                inputMask
                graph
                criticalRange {
                    min
                    max
                }
                normalRange {
                    min
                    max
                }
        }
`;


export const TrackerInfoFragment = gql`
            fragment TrackerInfo on Tracker {
                id
                label
                units {
                    id
                    name
                    getLabels
                }
                inputMask
                getLastReport (userId: $userId)  @connection(key: "trackerLastReport", filter: ["userId"]) {
                    ...TrackerReportInfo
                }
                reports (user_id: $userId, date: $date) @connection(key: "trackerReports", filter: ["userId", "date"]) {
                    ...TrackerReportInfo
                }
                graph
                criticalRange {
                    min
                    max
                }
                normalRange {
                    min
                    max
                }
        }
        ${TrackerReportInfoFragment}
`;

export const BiometricCardInfoFragment = gql`
            fragment BiometricCardInfo on TrackerPlanTracker {
                id
                measurement {
                    ...TrackerInfo
                }
                timesToReport
                columns
            }
            ${TrackerInfoFragment}
`;