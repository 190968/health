import gql from 'graphql-tag';
import { ProviderFragment } from '../../routes/Manager/components/Providers/fragments';
import ProcedureSelect from '../Autosuggest/components/ProcedureSelect';
import { TaskAttachmentInfoFragment } from '../../routes/Manager/components/Tasks/fragments';

export const DmeEquipmentFragment = gql`
    fragment DmeEquipment on DmeEquipment {
        id
        procedureCode {
            id
            hcpc
            name
        }
        equipmentCategory {
            key
            label
        }
        quantity
        modifier
        provider {
            ...Provider
        }
        dmeEquipmentStatus
    }
    ${ProviderFragment}
`;

export const DmeFragment = gql`
    fragment Dme on Dme {
        id
        source
        equipments {
            ...DmeEquipment
        }
        isAllEquipmentSupplied
        serviceDate
        prescriptionType
        dmePrescription {
            id
            type
            label
            url
            size
        }
    }
    ${DmeEquipmentFragment}
`;


export const DmeAttachmentInfoFragment = gql`
fragment DmeAttachmentInfo on TaskAttachment {
    id
    type
    object {
        ... on Dme {
            ...Dme
        }
    }
    attachmentStatus:status
}
${DmeFragment}
`;


export const DmeReferralFragment = gql`
    fragment DmeReferral on DmeReferral {
        id
        createdOn
        provider {
            ...Provider
        }
        getAttachments {
            ...DmeAttachmentInfo
        }
        dmeReferralStatus
        icd10Codes {
            id
            code
            name
        }
    }
    ${ProviderFragment}
    ${DmeAttachmentInfoFragment}
`;