import { connect } from 'react-redux'
import { withApollo,graphql } from 'react-apollo';
import gql from 'graphql-tag';
import LogoutForm from '../components/Logout'
import { logoutUser } from '../modules/user';
import { UserMainInfo_QUERY } from './loginContainer';
import { withLogoutActiveUser } from '../../../components/App/app-context';
import { CurrentUserInfoFragment } from '../fragments';

const logoutUserQuery = gql`
    mutation logout{
        logout {
            ...CurrentUserInfo
        }
    }
    ${CurrentUserInfoFragment}
`;



const LogoutFormWithMutation = graphql(logoutUserQuery,
    {
        props: ({ ownProps, mutate }) => ({
            logout: input => {
                return mutate({
                    // refetchQueries: [{
                    //                     query: UserMainInfo_QUERY,
                    //                 }],
                    update: (store, { data: { logout} }) => {

                        // Read the data from our cache for this query.
                        const data = store.readQuery({
                            query: UserMainInfo_QUERY,
                        });
    
                        const newData = {...data, ...{account: {...data.account, ...logout}}};
                        store.writeQuery({
                            query: UserMainInfo_QUERY,
                            data: newData
                        });
                    }
                }).then((data) => {
                    if (!data.loading) {
                        localStorage.removeItem('token');
                        ownProps.logoutUser({});
                        ownProps.history.push('/')
                    }
                })
            },
        }),
    }
);

export default withApollo(withLogoutActiveUser(LogoutFormWithMutation(LogoutForm)));