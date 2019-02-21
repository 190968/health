import ChatThreads from '../components/ChatThreads';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../../User/fragments';
import { withActiveUserSimple } from '../../../components/App/app-context';

export const GET_CONVERSATIONS = gql`    
    query GET_CONVERSATIONS {
        account {
          inboxConversations {
            totalCount
            edges {
              id
              subject
              unreadMessages
              lastMessage {
                  id
                  text
                  sentAt
                  sender {
                    ...UserInfo
                  }
              }
              participants {
                totalCount
                edges {
                    ...UserInfo
                }
              }
            }
          }
      }
    }
    ${UserInfoFragment}
`;

const withQuery = graphql(
    GET_CONVERSATIONS,
    {
        options: () => {
            return {
                //pollInterval: 10000,
                //fetchPolicy: 'network-only'
            }
        },
        props: ({ data }) => {
            const {inboxConversations} = data.account || {};
            const {edges=[], totalCount=0} = inboxConversations || {};
            return {
                conversations: edges,
                totalCount: totalCount,
                loading: data.loading,
                refetch:data.refetch,
                reload: () => {
                    data.refetch();
                }
            }
        },
    }
);


export default withActiveUserSimple(withQuery(ChatThreads));