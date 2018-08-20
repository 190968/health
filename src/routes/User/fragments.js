import gql from 'graphql-tag';

export const UserInfoFragment = gql`
       fragment UserInfo on User {
                id,
                firstName
                thumbs {
                    small
                    large
                    medium
                },
                lastName
                fullName
                gender
                genderText
                age
        }
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




export const PatientInfoFragment = gql`
       fragment PatientInfo on Patient {
                id,
                firstName
                thumbs {
                    small
                    large
                    medium
                },
                lastName
                fullName
                gender
                genderText
                age
        }
`;


export const CurrentUserInfoFragment = gql`
       fragment CurrentUserInfo on Account {
            user {
                ...UserInfo
                dateFormat
                phoneConfirmed
                phone {
                    code
                    number
                }
            }
            currentRole
            currentToken {
                token
                isExpired
            }
            possibleNetworkRoles
            possibleProviderRoles
        }
        ${UserInfoFragment}
`;
