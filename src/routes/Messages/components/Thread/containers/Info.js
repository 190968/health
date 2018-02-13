import ChatInfo from '../components/ChatInfo';
import { connect } from 'react-redux'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withState, lifecycle } from "recompose";

export const GET_CONVERSATION_MESSAGES_QUERY = gql`
    query GET_CONVERSATION_INFO ($id: UID!) {
      account {
          inboxConversation (id:$id) {
              id
              subject
              createdAt
              participants {
                totalCount
                edges {
                  id
                  fullName
                }
              }
          }
      }
    }
`;

const ChatWithQuery = graphql(
    GET_CONVERSATION_MESSAGES_QUERY,
    {
        options: (ownProps) => {
            return {
                variables: {
                    id: ownProps.id,
                },
            }
        },
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                return {
                    info: data.account.inboxConversation,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
)(ChatInfo);

export default ChatWithQuery;