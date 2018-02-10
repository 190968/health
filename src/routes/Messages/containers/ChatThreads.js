import ChatThreads from '../components/ChatThreads';
import { connect } from 'react-redux'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const GET_CONVERSATIONS = gql`    
    query GET_CONVERSATIONS {
      inboxConversations {
        totalCount
        edges {
          id
          subject
          lastMessage {
              id
              text
              sentAt
          }
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

const ChatThreadsWithQuery = graphql(
    GET_CONVERSATIONS,
    {
        options: (ownProps) => {
            return {
                pollInterval: 10000,
                fetchPolicy: 'network-only'
            }
        },
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                const {edges, totalCount} = data.inboxConversations;
                return {
                    conversations: edges,
                    totalCount: totalCount,
                    loading: data.loading,
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
)(ChatThreads);



const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatThreadsWithQuery);