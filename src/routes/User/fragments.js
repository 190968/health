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
        }
`;
