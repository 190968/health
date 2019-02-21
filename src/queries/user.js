import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { CurrentUserInfoFragment } from '../routes/User/fragments';
import { NetworkInfoFragment, ProviderInfoFragment } from './network';
import { withActiveUser } from '../components/App/app-context';
export const CurrentUserQUERY = gql`
    query GET_CURRENT_USER  {
        account   {
            ...CurrentUserInfo
        }
    }
    ${CurrentUserInfoFragment}
`;


export const withCurrentUser = withActiveUser;

export const CurrentUserNetworkQUERY = gql`
query GET_CURRENT_USER_NETWORK  {
    account {
        ...CurrentUserInfo
    }
    network {
        ...NetworkInfo
    }
    provider {
        ...ProviderInfo
    }
}
${CurrentUserInfoFragment}
${NetworkInfoFragment}
${ProviderInfoFragment}
`;

export const withCurrentUserAndNetwork = graphql(CurrentUserNetworkQUERY,
    {
        options: (ownProps) => {
            //console.log(ownProps);
            return {
                //fetchPolicy: 'cache-first'
                //fetchPolicy: 'no-cache'
                //fetchPolicy: 'network-only',
                //notifyOnNetworkStatusChange: true
            }
        },
        props: ({ ownProps, data }) => {
            const {account, loading, network, provider} = data;
            const {user={}, currentRole, currentToken, ...otherProps} = account || {};
            let {token, isExpired} = currentToken || {};
            if (isExpired) {
                token = '';
            }
            // console.log(data, 'loading user network');
            return {currentNetwork:network, currentProvider:provider, currentUser:{...user, currentRole, token, ...otherProps}, loading};
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