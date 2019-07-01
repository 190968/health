
import gql from 'graphql-tag';
import { TaskAttachmentInfoFragment } from '../../../../routes/Manager/components/Tasks/fragments';
import { PatientInfoFragment } from '../../../../routes/User/fragments';

export const DischargePlanFragment = gql`
fragment DischargePlan on DischargePlan {
    id
    isActive
    patient {
        ...PatientInfo
    }
    getAttachments {
        ...TaskAttachmentInfo
    }
}
${TaskAttachmentInfoFragment}
${PatientInfoFragment}
`;  