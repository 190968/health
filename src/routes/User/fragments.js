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


export const PatientInfoFragment = gql`
       fragment UserInfo on Patient {
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
                phoneConfirmed
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
