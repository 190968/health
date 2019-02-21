import gql from 'graphql-tag';
import { PhoneInfoFragment } from '../../components/FormCustomFields/components/Phone/fragments';
import { AddressInfoFragment } from '../../components/FormCustomFields/components/Address/fragments';

export const UserInfoFragment = gql`
       fragment UserInfo on User {
                id,
                firstName
                # thumbs {
                #     small
                #     large
                #     medium
                # }
                color
                lastName
                fullName
                gender
                genderText
                age
                email
        }
`;

export const PatientInfoFragment = gql`
       fragment PatientInfo on Patient {
                id,
                firstName
                # thumbs {
                #     small
                #     large
                #     medium
                # }
                color
                lastName
                fullName
                gender
                genderText
                age
                email
                phone {
                    ...PhoneInfo
                }
        }
        ${PhoneInfoFragment}
`;


export const UserInfoPhoneFragment = gql`
       fragment UserPhoneInfo on User {
            ...UserInfo
            phoneConfirmed
            phone {
                code
                number
            }

        }
        ${UserInfoFragment}
`;


export const CurrentUserInfoFragment = gql`
       fragment CurrentUserInfo on Account {
            user {
                ...UserInfo

                dateFormat
                phoneConfirmed
                phone {
                    ...PhoneInfo
                }
                localeSimple
            }
            currentRole
            currentToken {
                token
                isExpired
            }
            possibleNetworkRoles
            possibleProviderRoles
            possibleProviders {
                id
                name
            }
        }
        ${UserInfoFragment}
        ${PhoneInfoFragment}
`;




export const UserSettingInfoFragment =  gql`
 fragment UserSettingInfo on User {
    ...UserInfo
    possibleTitles
    title,
    firstName,
    middleName,
    lastName,
    birthday,
    gender,
    phone {
        ...PhoneInfo
    }
    phoneConfirmed
    language,
    timezone
    address {
        ...AddressInfo
    }
    email  
}
${UserInfoFragment}
${PhoneInfoFragment}
${AddressInfoFragment}
`;
   