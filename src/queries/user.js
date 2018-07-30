import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../routes/User/fragments';

const CurrentUserQUERY = gql`
    query GET_CURRENT_USER  {
        account   {
            user {
                ...UserInfo
            }
            currentRole
            token
        }
    }
    ${UserInfoFragment}
`;

export const withCurrentUser = graphql(CurrentUserQUERY,
    {
        options: () => {
            return {
                //fetchPolicy: 'cache-only'
            }
        },
        props: ({ data }) => {
            const {account={}} = data;
            const {user, currentRole, token} = account;
            return {currentUser:{...user, currentRole, token}};
        }
    }
)


/**
 * Get current role of the patient from cache
 */
export const GET_CURRENT_ROLE_QUERY = gql`
    query GET_CURRENT_ROLE {
      account {
         currentRole
      }
    }
`;

export const withCurrentRoleQuery = graphql(
    GET_CURRENT_ROLE_QUERY,
    {
        options: () => {
            return {
                fetchPolicy: 'cache-only'
            }
        },
        props: ({data}) => {
            return {
                currentRole: data.account.currentRole,
            }
        }
    }
)