import {compose, withState, withHandlers} from 'recompose';
import { Form, message } from 'antd';
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

const withMutation = graphql(loginUser, {
    props: ({ mutate, ownProps }) => ({
        loginUser: input => {
            return mutate({
                variables: { input: {email: input.email, password: input.password}},
                // update query

                update: (store, { data: { login} }) => {

                    // Read the data from our cache for this query.
                    const data = store.readQuery({
                        query: UserMainInfo_QUERY,
                    });

                    //console.log(data);

                    const account = login;
                    const {currentToken={}} = account;
                    let {token='', isExpired} = currentToken;
                    if (isExpired) {
                        token = '';
                    }

                    localStorage.setItem('token', token);
                   

                    const newData = {...data, ...{account: {...data.account, ...login}}};

                    ownProps.setLoadingButton(false);
                    //console.log(newData, 'New data upon login');
                    store.writeQuery({
                        query: UserMainInfo_QUERY,
                        data: newData
                    });
                }
            })
        },
    }),
});
 
// const mapDispatchToProps = (dispatch, ownProps) => ({
    
//     onClick: ({forgot_email}) => {
//         ownProps.forgotPassword({ email:forgot_email})
//             .then(({data}) => {

//                 // redirect to Enter code
//                 ownProps.history.push('/password/reset');
//                 // show success message
//                 message.success('Reset password link has been sent');

//             });/*.catch((error) => {


//         });*/


//     },
// });

const enhance = compose(
    Form.create(),
    withLoadingButton,
    withCurrentUser,
    withMutation,
    withHandlers({
        onSubmit: props => (e) => {
            e.preventDefault();
    
            props.form.validateFields((err, values) => {
                if (!err) {

                    const{email, password} = values;
                    // set loading button as loading
                    props.setLoadingButton(true);

                    props.loginUser({ email:email, password:password }).then(({data}) => {
                            // const account = data.login;
                            // const {currentToken={}, currentRole, user, ...otherProps} = account;
                            // let {token='', isExpired} = currentToken;
                            // if (isExpired) {
                            //     token = '';
                            // }
                            
                            // const {location={}} = ownProps;
                            // const {state={}} = location;
                            // const {from={}} = state;
                            // const {pathname} = from;
                            message.success('Logged in');
 
                        }).catch((error) => {
                            props.setLoadingButton(false);
                            
                            //message.error(error.message);
                    });
                }
            });
        }
    })
);
//withMutationForgot
//withRouter


export default enhance(LoginForm);
//export default compose(,, ,,connect(mapStateToProps, mapDispatchToProps))( (((LoginForm))));






