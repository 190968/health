import ChangeUserPassword from '../components/ChangeUserPasswordModal';
import { withModal } from '../../../../../../../components/Modal';
import { compose, withHandlers, withProps } from 'recompose';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {Form, message} from 'antd';
import {
    injectIntl,
} from 'react-intl';
import { withLoadingButton } from '../../../../../../../components/Loading';


const CHANGE_USER_PASSWORD_MUTATION = gql`
    mutation ChangeUserPasswroed($userId: UID!, $password:String!, $passwordConfirm:String!){
        updateUserPassword(userId:$userId,password:$password,passwordConfirm:$passwordConfirm)
    }
`;

const withMutation = graphql(CHANGE_USER_PASSWORD_MUTATION, {
    props: ({mutate, ownProps}) => {
        return {
            updatePassword: (values) => {
                return mutate({
                    variables: {...values, userId:ownProps.user.id},
                    // refetchQueries: [{
                    //     query: QUERY_EXECUTE,
                    //     variables: {role}
                    // }],
                });
            },
        }
    }
});

const enhance = compose(
    withLoadingButton,
    withMutation,
    Form.create(),
    injectIntl,
    withHandlers({
        onSubmit: props => () => {
            props.form.validateFields((err, values) => {
                if (!err) {
                    props.setLoadingButton(true);
                    props.updatePassword(values).then(({data})=> {
                        message.success('Updated');
                        props.onHide();
                    });
                }
            });
        },
        checkPassword: props => (rule, value, callback) => {
            const form = props.form;
            if (value && value !== form.getFieldValue('password')) {
                callback(props.intl.messages.user_inconsistent);
            } else {
                callback();
            }
        },
        checkConfirm: props => (rule, value, callback) => {
            const form = props.form;
            if (value /*&& this.state.confirmDirty*/) {
                form.validateFields(['confirm'], { force: true });
            }
            callback();
        }
    }),
    withProps(props => {
        return {
            modalTitle: 'Change Password',
            modalOKText: 'Update Password'
        }
    }),
    withModal
);

export const ChangeUserPasswordModal =  enhance(ChangeUserPassword);