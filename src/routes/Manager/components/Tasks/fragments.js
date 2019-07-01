import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../User/fragments';
import { PlanCardFragment, UserPlanFragment } from '../../../Plan/components/Plan/fragments';
import { DmeFragment } from '../../../../components/DME/fragments';
import { MedicationInfoFragment } from '../../../Plan/components/MedicationPlan/components/Medication/components/fragments';
import { TrackerPlanTrackerFragment } from '../../../Plan/components/BiometricPlan/fragments';

export const TaskAttachmentInfoFragment = gql`
fragment TaskAttachmentInfo on TaskAttachment {
    id
    type
    object {
        ... on Plan {
            ...PlanCardInfo
        }
        ... on UserPlan {
            ...UserPlanInfo
        }
        ... on Assessment {
            id
            name
        }
        ... on UserAssessment {
            id
            assessment {
                id
                name
            }
            startDate
            endDate
            repeatedDays
        }
        ... on Dme {
            ...Dme
        }
        ... on Medication {
            ...MedicationInfo
            timesPerHour {
                id
                time
                quantity
            }
        }
        ... on TrackerPlanTracker {
            ...TrackerPlanTracker
        }
    }
    attachmentStatus:status
}
${PlanCardFragment}
${UserPlanFragment}
${DmeFragment}
${MedicationInfoFragment}
${TrackerPlanTrackerFragment}
`;

export const TaskInfoFragment = gql`
fragment TaskInfo on Task {
    id
    title
    isClosed
    createdOn
    endDate
    status
    priority
    type
    isParticipant
    guidelines
    source
    recipient {
        ...UserInfo
    }
    patient {
        ...UserInfo
    }
    sender {
        ...UserInfo
    }
    participants {
        ...UserInfo
    }
    getAttachments {
        ...TaskAttachmentInfo
    }
}
${UserInfoFragment}
${TaskAttachmentInfoFragment}
`;  