import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../User/fragments';
import { AddressInfoFragment } from '../../../../components/FormCustomFields/components/Address/fragments';

export const ProviderFragment = gql`
    fragment Provider on Provider {
        id
        title
        typeText
        canBeEdited
        isInternal
        npi
        taxId
        address {
            ...AddressInfo
        }
    }
    ${AddressInfoFragment}
`;

export const ProviderManageFragment = gql`
    fragment ProviderManage on Provider {
        ...Provider
    }
    ${ ProviderFragment }
`;

export const ProviderFullFragment = gql`
    fragment ProviderFull on Provider {
        ...Provider
        getTotalPatients
        getTotalCareGivers:getTotalStaff(role: cm)
        getTotalManagers:getTotalStaff(role: manager)
        getAdherence {
            level
        }
    }
    ${ ProviderFragment }
`;

export const NetworkProviderFragment = gql`
    fragment NetworkProvider on NetworkProvider {
        id
        createdOn
        createdBy {
            ...UserInfo
        }
        deletedBy {
            ...UserInfo
        }
        deletedOn
    }
    ${UserInfoFragment}
`;