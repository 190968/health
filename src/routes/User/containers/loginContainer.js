import React from 'react'
import { connect } from 'react-redux'

import { loginUserRequest, loginUserSuccess, loginUserError} from '../modules/login'
import { loadUser, setUserToken} from '../modules/user'
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import LoginForm from '../components/loginComponent'
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
    //console.log(state.user.token);
   // console.log("----------------------1");

    return {
        // view store:
        //currentView:  state.views.currentView,
        // userAuth:
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

                dispatch(loadUser(user));

                dispatch(setUserToken({token}));
                dispatch(loginUserSuccess({token}));
                /*if (token) {
                    return window.location.href = "/";
                }*/
            }).catch((error) => {
            //console.log(error);
            dispatch(loginUserError({
                error,
            }));
        });
    },
});


export default withMutation(connect(mapStateToProps, mapDispatchToProps)(LoginForm));



/*
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginFormWithData);*/