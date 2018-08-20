import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ForgorPasswordRequest from '../components/ForgorPasswordRequest';
import { compose, withHandlers, withProps } from 'recompose';
import { withModal } from '../../../../../components/Modal';
import {Form, notification} from 'antd';
import { withLoadingButton } from '../../../../../components/Loading';

const forgotPassword = gql`
    mutation forgotPassword($email:Email!) {
       forgotPassword(email:$email)
    }

`;
const withMutationForgot = graphql(forgotPassword,
    {
        props: ({ mutate }) => ({
            forgotPassword: ({email}) => {
                return mutate({
                    variables: { email },
                })
            },
        }),
    }
);

const enhance = compose(
    Form.create(),
    withLoadingButton,
    withMutationForgot,
    withHandlers({
        onSubmit: props => (e) => {
            props.setLoadingButton(true);
            props.form.validateFields((err, values) => {
                if (!err) {

                    const{email} = values;
                    console.log(values);

                    props.setLoadingButton(true);

                    props.forgotPassword({ email }).then(({data}) => {
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
                            //notification.success('Email has been sent');
                            notification['success']({
                                message: 'Please check your mailbox',
                                description: 'We\'ve sent you an email that will allow you to reset your password quickly and easily',
                              });
                            props.onHide();
 
                        }).catch((error) => {
                            props.setLoadingButton(false);
                            
                            //message.error(error.message);
                    });
                }
            });
        },
    }),
    withProps(props => {
        return {modalTitle: 'Reset Password', modalFooter:false}
    }),
    withModal
);

export default enhance(ForgorPasswordRequest);