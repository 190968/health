/**
 * Created by Pavel on 09.12.2017.
 */
//import { connect } from 'react-redux'
import {notification} from 'antd';
/*  This is a container components. Notice it does not contain any JSX,
 nor does it import React. This components is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 components - in this case, the counter:   */

import VerifyPhoneConfirmForm from '../components/VerifyPhoneConfirm'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter} from "react-router-dom";
import LoginForm from "../components/Login";
import {updatePhoneConfirm} from "../modules/user";
import { UserInfoPhoneFragment, CurrentUserInfoFragment } from '../fragments';
import { withCurrentUser } from '../../../queries/user';


const verifyPhoneConfirm = gql`
mutation verifyPhoneConfirm($code:String!) {
       confirmPhoneVerification(code:$code) {
        ...CurrentUserInfo
       }
    }
    ${CurrentUserInfoFragment}
`;

const withMutation = graphql(verifyPhoneConfirm, {
    props: ({ ownProps, mutate }) => ({
        onSubmit: (props) => {
            const{code} = props;
            //console.log(ownProps);
            const  {currentUser:user} = ownProps;
            return mutate({
                variables: {code:code },
                // update: (store, { data: { verifyPhoneConfirm } }) => {


                //     const userOld = store.readFragment({
                //         id: 'User:'+user.id, // `id` is any id that could be returned by `dataIdFromObject`.
                //         fragment: UserInfoPhoneFragment,
                //         fragmentName: 'UserPhoneInfo'
                //     });

                //     console.log(userOld, 'userOld');

                //     notification['success']({
                //         message: 'Phone verified',
                //         description: 'Now you can use the system',
                //       });

                //     store.writeFragment({
                //         id: 'User:'+user.id,
                //         fragment: UserInfoPhoneFragment,
                //         fragmentName: 'UserPhoneInfo',
                //         data: {
                //             ...userOld,
                //             phoneConfirmed: verifyPhoneConfirm,
                //             __typename:'User'
                //         },
                //     });

                    
                // },
            })},
    }),
});

// const mapStateToProps = (state) => {

//     return {
//     };
// };

// const mapDispatchToProps = (dispatch, ownProps) => ({
//     onSubmit: (props, userId) => {
//         const{code} = props;

//         ownProps.verifyPhoneConfirm({code:code }, userId)
//             .then(({data}) => {

//                 // update user info
//                 //dispatch(updatePhoneConfirm(data.verifyPhoneConfirm));


//                 //ownProps.history.push('/');

//             }).catch((error) => {

//         });
//     },
// });

export default withRouter(withCurrentUser(withMutation(VerifyPhoneConfirmForm)));

