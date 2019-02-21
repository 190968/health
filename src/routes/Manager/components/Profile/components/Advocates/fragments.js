
import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../../../User/fragments';

export const AdvocateFragment = gql`
        fragment Advocate on Advocate {
            id
            user {
                ...UserInfo
            }
            firstName
            lastName
            email
            joinedDate
            invitedOn
            role
            roleText
        }
        ${UserInfoFragment}
`;
