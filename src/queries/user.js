import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { CurrentUserInfoFragment } from '../routes/User/fragments';
import { CurrentNetworkInfoFragment } from './network';

export const CurrentUserQUERY = gql`
    query GET_CURRENT_USER  {
        account   {
            ...CurrentUserInfo
        }
    }
    ${CurrentUserInfoFragment}
`;



export const withCurrentUser = graphql(CurrentUserQUERY,
    {
        options: () => {
            return {
                //fetchPolicy: 'cache-only'
            }
        },
        props: ({ ownProps, data }) => {
            const {loading:ownLoading} = ownProps;
            const {account={}, loading=ownLoading} = data;
            const {user, currentRole, currentToken={}, ...otherProps} = account;
            let {token, isExpired=true} = currentToken;
            //console.log(currentToken);
            if (isExpired) {
                token = '';
            }
            return {currentUser:{...user, currentRole, token, ...otherProps}, loading};
        }
    }
)

export const CurrentUserNetworkQUERY = gql`
query GET_CURRENT_USER_NETWORK  {
    account   {
        ...CurrentUserInfo
        ...CurrentNetworkInfo
    }
}
${CurrentUserInfoFragment}
${CurrentNetworkInfoFragment}
`;

export const withCurrentUserAndNerwork = graphql(CurrentUserNetworkQUERY,
    {
        options: () => {
            return {
                //fetchPolicy: 'cache-only'
            }
        },
        props: ({ ownProps, data }) => {
            const {account={}, loading} = data;
            const {user, currentRole, currentToken={}, currentNetwork, ...otherProps} = account;
            let {token, isExpired=true} = currentToken;
            console.log(isExpired);
            if (isExpired) {
                token = '';
            }
            return {currentNetwork, currentUser:{...user, currentRole, token, ...otherProps}, loading};
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