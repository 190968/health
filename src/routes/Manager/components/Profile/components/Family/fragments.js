
import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../../../User/fragments';

export const FamilyMemberInfoFragment = gql`
        fragment FamilyMemberInfo on FamilyMember {
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
            canReport
        }
        ${UserInfoFragment}
`;
