import { connect } from 'react-redux'
import { withApollo,graphql } from 'react-apollo';
import gql from 'graphql-tag';
import LogoutForm from '../components/Logout'
import { UserMainInfo_QUERY } from './loginContainer';
import { withLogoutActiveUser } from '../../../components/App/app-context';
import { CurrentUserInfoFragment } from '../fragments';
import {compose, lifecycle} from 'recompose';

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
    
                        const newData = {...data, ...{account: null}};
                        // update context
                        console.log(logout);
                        console.log(data);
                        console.log(newData);
                        
                        store.writeQuery({
                            query: UserMainInfo_QUERY,
                            data: newData
                        });
                    }
                }).then((data) => {
                    if (!data.loading) {
                        console.log(2);
                        // console.log('11111111');
                        ownProps.logoutUser(null);
                        localStorage.removeItem('token');
                        ownProps.history.push('/')
                    }
                })
            },
        }),
    }
);


const enhance = compose(
    withApollo,
    withLogoutActiveUser,
    LogoutFormWithMutation,
    lifecycle({
        componentDidMount() {
            this.props.logout();
        }
    })
);
export default enhance(LogoutForm);