/**
 * Created by Pavel on 27.11.2017.
 */
import { connect } from 'react-redux'
import { registerUserRequest, registerUserSuccess, registerUserError} from '../modules/register'
import { setUserToken, loadUser} from '../modules/user'
/*  This is a container component. Notice it does not contain any JSX,
 nor does it import React. This component is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 component - in this case, the counter:   */

import RegisterForm from '../components/registerComponent'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { loginUserSuccess} from '../modules/login'


const registerUser = gql`
   mutation registerUser( $input: RegisterInput!){
        register(input:$input) {
            user {
                id,
                first_name,
                last_name,
                token,
                new_notifications,
                new_messages
            }
        }
    }
`;

const withMutation = graphql(registerUser, {
    props: ({ mutate }) => ({
        registerUser: input => {
            return mutate({
                variables: {input:{first_name:input.first_name,last_name:input.last_name,birthday:input.birthday.format("YYYY-MM-DD"),gender:input.gender, email: input.email, password: input.password,password_repeat: input.password_repeat,phone: input.phone,prefix:input.prefix }},
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
        const{first_name,last_name,birthday,gender,email, password,password_repeat,prefix,phone} = props;
        //console.log(birthday);
        //var birth = birthday.substring(0,10);
        //console.log(birth);
        ownProps.registerUser({first_name:first_name,last_name:last_name,birthday:birthday,gender:gender, email:email, password:password,password_repeat:password_repeat,phone:[prefix,phone] })
            .then(({data}) => {
                const {user} = data.register;
                const {token} = user;
                dispatch(loadUser(user));
                dispatch(setUserToken({token}));
                dispatch(loginUserSuccess({token}));
              //  console.log("----registr----");
                //console.log(data);
            }).catch((error) => {
            console.log(error);
            dispatch(registerUserError({
                error,
            }));
        });
    },
});


export default withMutation(connect(mapStateToProps, mapDispatchToProps)(RegisterForm));
/*
 export default connect(
 mapStateToProps,
 mapDispatchToProps
 )(LoginFormWithData);*/