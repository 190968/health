import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { CurrentUserInfoFragment } from '../routes/User/fragments';
import { CurrentNetworkInfoFragment } from './network';
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
export const withCurrentUser3 = graphql(CurrentUserQUERY,
    {
        options: () => {
            return {
                fetchPolicy: 'cache-only'
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
            //console.log(data, 'Loading Current User');
            return {currentUser:{...user, currentRole, token, ...otherProps}};
        }
    }
)

//const CurrentUserContext = React.createContext('light');

// // This function takes a component...
// export const withCurrentUserHOC = (Component) => {
//   // ...and returns another component...
//   return function withCurrentUserComponent(props) {
//     // ... and renders the wrapped component with the context theme!
//     // Notice that we pass through any additional props as well
//     return (
//       <CurrentUserContext.Consumer>
//         {theme => <Component {...props} theme={theme} />}
//       </CurrentUserContext.Consumer>
//     );
//   };
// }

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

export const withCurrentUserAndNetwork = graphql(CurrentUserNetworkQUERY,
    {
        options: () => {
            return {
                fetchPolicy: 'cache-first'
            }
        },
        props: ({ ownProps, data }) => {
            const {account={}, loading} = data;
            const {user={}, currentRole, currentToken={}, currentNetwork, ...otherProps} = account || {};
            let {token, isExpired} = currentToken;
            if (isExpired) {
                token = '';
            }
            //console.log(data, 'loading user network');
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