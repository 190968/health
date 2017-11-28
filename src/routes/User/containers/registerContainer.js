/**
 * Created by Pavel on 27.11.2017.
 */
import { connect } from 'react-redux'
import { registerUserRequest, registerUserSuccess, registerUserError} from '../modules/register'
import { setUserToken} from '../modules/user'
/*  This is a container component. Notice it does not contain any JSX,
 nor does it import React. This component is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 component - in this case, the counter:   */

import LoginForm from '../components/registerComponent'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const loginUser = gql`
    mutation loginUser($email: Email! $password: String!){
        login(email: $email, password: $password) {
            user{id}, token
        }
    }
`;



const withMutation = graphql(loginUser, {
    props: ({ mutate }) => ({
        loginUser: input => {
            return mutate({
                variables: { email: input.email, password: input.password },
            })},
    }),
});

const mapStateToProps = (state) => {
    //console.log(state.user);
    return {
        // view store:
        //currentView:  state.views.currentView,
        // userAuth:
        token: state.user.token
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (props) => {
        //dispatch(loginUserRequest({ email }));
        //console.log(props);
        const{email, password} = props;
        ownProps.loginUser({ email:email, password:password })
            .then(({data}) => {
                const token = data.login.token;
                //console.log(data);
                //console.log(token);
                dispatch(setUserToken({token}));
                dispatch(registerUserSuccess({token}));
            }).catch((error) => {
            console.log(error);
            dispatch(registerUserError({
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