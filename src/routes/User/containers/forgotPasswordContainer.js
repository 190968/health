import { message, Form } from 'antd';
import {withRouter} from 'react-router'
import {compose, withHandlers} from 'recompose';
import ForgotForm from '../components/ForgotPassword';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withModal } from '../../../components/Modal';


const forgotPasswordConfirm = gql`
    mutation forgotPasswordConfirm($code:String!,$new_password:String!,$new_password_repeat:String!) {
       forgotPasswordConfirm(code:$code, new_password:$new_password, new_password_repeat:$new_password_repeat
      )
    }
`;

const withMutation = graphql(forgotPasswordConfirm, {
    props: ({ mutate }) => ({
        forgotPasswordConfirm: input => {
            return mutate({
                variables: { code: input.code, new_password: input.new_password,new_password_repeat:input.new_password_repeat },
            })
        },
    }),
});
 
const enhance = compose(
    withRouter,
    withMutation,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {

            const{new_password,new_password_repeat} = props;
            let {code} = props;

            const code_from_url = props.match.params.code;
            // if the code has been in form - use that one, otherwise - use from url
            code = code || code_from_url;

            props.forgotPasswordConfirm({ code:code, new_password:new_password,new_password_repeat:new_password_repeat})
                .then(({data}) => {

                    // redirect to Enter code
                    props.history.push('/login');
                    // show success message
                    message.success('Password has been reset');
                }).catch((error) => {

            });
        }
    }),
    //withModal
)

export default enhance(ForgotForm);