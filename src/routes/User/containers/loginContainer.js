import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'react-apollo';
import { message } from 'antd';
import { loginUserSuccess, loginUserError} from '../modules/login'
import { loadUser, setUserToken} from '../modules/user'

import LoginForm from '../components/Login'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const loginUser = gql`
    mutation loginUser($input: LoginInput!) {
        login(input: $input) {
            user {
                id,
                first_name,
                last_name,
                token,
                new_notifications,
                new_messages
            } 
            token
        }
    }
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
                variables: { input: {email: input.email, password: input.password} },
            })
        },
    }),
});


const mapStateToProps = (state) => {
    return {
        token: state.user.token
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (props) => {
        const{email, password} = props;
        ownProps.loginUser({ email:email, password:password })
            .then(({data}) => {
                const token = data.login.token;
                const user = data.login.user;
                //console.log(data);
                dispatch(loadUser(user));

                dispatch(setUserToken({token}));
                dispatch(loginUserSuccess({token}));
            }).catch((error) => {
            message.error(error.message);

            dispatch(loginUserError({
                error,
            }));
        });
    },
    onClick: ({forgot_email}) => {
        ownProps.forgotPassword({ email:forgot_email})
            .then(({data}) => {
                //console.log(data);
                // redirect to Enter code
                ownProps.history.push('/password/reset');
                // show success message
                message.success('Reset password link has been sent');

            }).catch((error) => {
            //console.log(error);
            dispatch(loginUserError({
                error,
            }));
        });


    },
});
export default compose(withMutation,withMutationForgot,connect(mapStateToProps, mapDispatchToProps))((LoginForm));






