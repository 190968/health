//import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'react-apollo';
import {withRouter} from 'react-router'
import { message } from 'antd';
import { loginUserSuccess, loginUserError} from '../modules/login'
import {loadUser, loadUserFAIL, loadUserPrepare} from '../modules/user'

import LoginForm from '../components/Login'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withCurrentUser, CurrentUserQUERY } from '../../../queries/user';
 
import { withCurrentNetwork } from '../../../queries/network';
import { CurrentUserInfoFragment } from '../fragments';
import { withLoadingButton } from '../../../components/Loading';


export const UserMainInfo_QUERY = CurrentUserQUERY;
const loginUser = gql`
    mutation loginUser($input: LoginInput!) {
        login(input: $input) {
            ...CurrentUserInfo
        }
    }
    ${CurrentUserInfoFragment}
`;
const forgotPassword = gql`
    mutation forgotPassword($email:Email!) {
       forgotPassword(email:$email)
    }

`;
const withMutationForgot = graphql(forgotPassword,
    {
        props: ({ mutate }) => ({
            forgotPassword: input => {
                return mutate({
                    variables: { email: input.email},
                })
            },
        }),
    }
);
const withMutation = graphql(loginUser, {
    props: ({ mutate }) => ({
        loginUser: input => {
            return mutate({
                variables: { input: {email: input.email, password: input.password}},
                // update query

                update: (store, { data: { login} }) => {

                    // Read the data from our cache for this query.
                    const data = store.readQuery({
                        query: UserMainInfo_QUERY,
                    });

                    console.log(data);
                   

                    const newData = {...data, ...{account: {...data.account, ...login}}};
                    console.log(newData);
                    store.writeQuery({
                        query: UserMainInfo_QUERY,
                        data: newData
                    });
                }
            })
        },
    }),
});
const mapStateToProps = (state) => {
    return {
        //allowSignUp: state.network.allowSignUp,
        //token: state.user.token,
        //loading: state.user.loading
    };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (props) => {
        const{email, password} = props;
        dispatch(loadUserPrepare());
        ownProps.setLoadingButton(true);
        ownProps.loginUser({ email:email, password:password })
            .then(({data}) => {
                ownProps.setLoadingButton(false);
                const {currentToken={}, currentRole, user} = data.login;
                let {token='', isExpired} = currentToken;
                if (isExpired) {
                    token = '';
                }
                //let user = data.login.user;
                //user.token = token;
                //dispatch(loadUser(user));
                
                

                localStorage.setItem('token', token);
                //dispatch(setUserToken(token));



                //dispatch(loginUserSuccess({token}));
                const {location={}} = ownProps;
                const {state={}} = location;
                const {from={}} = state;
                const {pathname} = from;
                

                //console.log(location);
                //console.log(pathname);
                if (pathname) {
                    setTimeout(() => {
                        ownProps.history.push(pathname);
                    }, 100);
                }

                ownProps.updateCurrentUser({...user, currentRole, token});

                

                //
            }).catch((error) => {
                ownProps.setLoadingButton(false);
                // dispatch(loadUserFAIL({ error,
                // }));
                // dispatch(loginUserError({
                //     error,
                // }));
                //message.error(error.message);


        });
    },
    onClick: ({forgot_email}) => {
        ownProps.forgotPassword({ email:forgot_email})
            .then(({data}) => {

                // redirect to Enter code
                ownProps.history.push('/password/reset');
                // show success message
                message.success('Reset password link has been sent');

            });/*.catch((error) => {


        });*/


    },
});

export default compose(withLoadingButton,withCurrentUser, withMutation,withMutationForgot,connect(mapStateToProps, mapDispatchToProps))( withRouter(withCurrentNetwork((LoginForm))));






