/**
 * Created by Pavel on 27.11.2017.
 */
import { connect } from 'react-redux'
import {loadUser} from '../modules/user'
/*  This is a container components. Notice it does not contain any JSX,
 nor does it import React. This components is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 components - in this case, the counter:   */

import RegisterForm from '../components/Register'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { loginUserSuccess} from '../modules/login'
//import LoginForm from "../components/Login";
import { CurrentUserInfoFragment } from '../fragments';
import { CurrentUserQUERY, withCurrentUser } from '../../../queries/user';
import { withCurrentNetwork } from '../../../queries/network';
import { withLoadingButton } from '../../../components/Loading';
const registerUser = gql`
   mutation registerUser( $input: RegisterInput!){
        register(input:$input) {
             ...CurrentUserInfo
        }
    }
     ${CurrentUserInfoFragment}
`;
const withMutation = graphql(registerUser, {
    props: ({ mutate, ownProps }) => ({
        registerUser: input => {
            return mutate({
                variables: {input:{firstName:input.firstName,lastName:input.lastName,birthday:input.birthday.format("YYYY-MM-DD"),gender:input.gender, email: input.email, password: input.password,password_repeat: input.password_repeat,phone: input.phone,prefix:input.prefix }},
                update: (store, { data: { register} }) => {

                    // Read the data from our cache for this query.
                    const data = store.readQuery({
                        query: CurrentUserQUERY,
                    });

                    const account = register;
                    const {currentToken={}} = account;
                    let {token='', isExpired} = currentToken;
                    if (isExpired) {
                        token = '';
                    }

                    localStorage.setItem('token', token);
                   

                    const newData = {...data, ...{account: {...data.account, ...register}}};
                    //console.log(newData, 'New data upon register');

                    ownProps.setLoadingButton(false);

                    store.writeQuery({
                        query: CurrentUserQUERY,
                        data: newData
                    });
                }
            })},
    }),
});
const mapStateToProps = (state) => {
    return {
        //token: state.user.token,
        //allowSignUp: state.network.allowSignUp,
        //loading: state.user.loading
    };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (props, stopLoading) => {
        const{first_name,last_name,birthday,gender,email, password,password_repeat,phone} = props;
        ownProps.registerUser({firstName:first_name,lastName:last_name,birthday:birthday,gender:gender, email:email, password:password,password_repeat:password_repeat,phone })
            .then(({data}) => {
                // const token = data.register.token;
                // let user = data.register.user;
                // user.token = token;
                // dispatch(loadUser(user));
                // dispatch(loginUserSuccess({token}));
                console.log('Redirect after register');
                //stopLoading();
            }).catch((error) => {
                stopLoading();
        });
    },
});

export default  withCurrentNetwork(withCurrentUser(withLoadingButton(withMutation(connect(mapStateToProps, mapDispatchToProps)(RegisterForm)))));
/*
 export default connect(
 mapStateToProps,
 mapDispatchToProps
 )(LoginFormWithData);*/