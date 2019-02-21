import Compose from '../components/Compose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {GET_CONVERSATIONS} from './ChatThreads';
import { compose, withHandlers, withProps } from 'recompose';
import { Form, message } from 'antd';
import { withDrawer } from '../../../components/Modal';

const composeMutation = gql`
 mutation ComposeMessage($input: ConversationInput!) {
        createConversation(input: $input) {
             id
        }
    }
`;


const withMutation = graphql(composeMutation, {
    props: ({mutate}) => ({
        sendMessage: (input) => {
            return mutate({
                variables: {input:input},
                refetchQueries: [{
                    query: GET_CONVERSATIONS,
                    //variables: {user_id: uid, date: date},
                }],
            })
        },
    }),
});

const enhance = compose(
    withMutation,
    Form.create(),
    withHandlers({
        handleSubmit: props => () => {
            const { sendMessage, form } = props;
            form.validateFields((err, values) => {
                if (!err) {
                    return sendMessage(values).then(() => {
                        message.success('Sent');
                        props.onCancel();
                    });
                }
            });
        }
    }),
    withProps(props => {
        return {modalTitle: 'Compose Message'}
    }),
    withDrawer
);
export const MessageCompose =  enhance(Compose);