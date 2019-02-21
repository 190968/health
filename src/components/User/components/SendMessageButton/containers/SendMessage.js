import SendMessagePure from '../components/SendMessage';
import {compose, withProps, withHandlers, branch} from 'recompose';
import {Form, message} from 'antd';
import {withRouter} from 'react-router-dom'
import { withModal, showLoadingMessage } from '../../../../Modal';
import { withActiveUser } from '../../../../App/app-context';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';



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
                // refetchQueries: [{
                //     //query: GET_CONVERSATIONS,
                //     //variables: {user_id: uid, date: date},
                // }],
            })
        },
    }),
});




const enhance = compose(
    withActiveUser,
    withMutation,
    Form.create(),
    branch(props => props.goToMessage, withRouter),
    withHandlers({
        onSubmit: props => () => {
            const {goToMessage, form } = props;
            form.validateFields((err, values) => {
                if (!err) {
                    const hide = showLoadingMessage('Sending...');

                    const input = prepareComposeInput(values);
                    props.sendMessage(input).then(({data}) => {
                        console.log(data);
                        const {createConversation} = data;
                        const {id:messageId} = createConversation || {};
                        message.success('Sent');
                        hide();
                        if (props.refetch) {
                            props.refetch();
                        }
                        if (props.onHide) {
                            props.onHide();
                        }
                        if (goToMessage) {
                            props.history.push('/messages/'+messageId);
                        }
                        ////this.props.onCancel();
                    });
                }
            });
        }
    }),
    withProps(props => {
        return {
            modalTitle: 'Compose Secured Message'
        }
    }),
    withModal
);
export const SendMessage = enhance(SendMessagePure);

const prepareComposeInput = value => {
    const {recipients, patient, ...input} = value;
    const {id:patientId} = patient || {};
    return {...input, patientId, recipients:recipients.map(recipient => recipient.id)};
}
