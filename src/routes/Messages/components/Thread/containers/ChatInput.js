import ChatInput from '../components/ChatInput';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withState, withHandlers } from 'recompose';

const SEND_MESSAGE = gql`
    mutation sendMessage($id: UID!, $message: String!) {
        sendMessage(id:$id, message:$message) {
            id
        }
    }
`;

const withMutation = graphql(SEND_MESSAGE, {
    props: ({ ownProps, mutate }) => ({
        onSendMessage: (message) => {
            return mutate({
                variables: { message: message, id: ownProps.id },
                refetchQueries: (mutationResult) => ['GET_CONVERSATIONS',/*{
                    query: GET_CONVERSATION_MESSAGES_QUERY,
                    variables: {
                        id: ownProps.id,
                        cursors: {after: ownProps.lastCursor}
                    },
                }*/]
            })
        },

    }),
});

const enhance = compose(
    withState('message', 'setMessage', ''),
    withMutation,
    withHandlers({
        handleChange: props => (e) => {
            props.setMessage(e.target.value);
        },
        sendMessage: props => () => {
            const { message } = props;
            props.onSendMessage(message).then(() => {
                if (props.refetch) {
                    props.refetch();
                }
            });
            props.setMessage('');
        }
    })
);
export default enhance(ChatInput);