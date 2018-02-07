import Chat from '../components/Chat';
import { connect } from 'react-redux'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withState, lifecycle } from "recompose";

export const GET_CONVERSATION_MESSAGES_QUERY = gql`    
    query GET_CONVERSATION_MESSAGES ($id: UID!, $cursors: CursorInput) {
      inboxConversation (id:$id) {
          id
          subject
          messages (cursors:$cursors) @connection(key: "messages") {
            totalCount
            pageInfo {
                endCursor
            }
            edges {
                id
                text
                isRead
                sender {
                    id
                    firstName
                }
                sentAt
              }
          }
      }
    }
`;

const ChatWithQuery = graphql(
    GET_CONVERSATION_MESSAGES_QUERY,
    {
        options: (ownProps) => {
            //console.log(ownProps);
            return {
                skip: !ownProps.id,
                variables: {
                    id: ownProps.id,
                    //cursors: {after: ownProps.lastCursor}
                },
                //pollInterval: 5000,
                //fetchPolicy: 'network-only'
            }

        },
        props: ({ ownProps, data }) => {
            if (data.inboxConversation || !data.loading) {
                const {edges, totalCount, pageInfo} = data.inboxConversation.messages;
                const {endCursor} = pageInfo;
                let messages = [];
                if (data.inboxConversation) {
                    //console.log(ownProps);
                    messages = edges;
                } else {
                    messages = edges;
                }

                return {
                    subject: data.inboxConversation.subject,
                    messages: messages,
                    totalCount: totalCount,
                    //lastCursor: endCursor,
                    loading: data.loading,
                    loadMoreEntries: (lastCursor) => {
                        return data.fetchMore({
                            query: GET_CONVERSATION_MESSAGES_QUERY,
                            variables: {
                                id: ownProps.id,
                                cursors: {after: lastCursor}
                            },
                            updateQuery: (previousResult, { fetchMoreResult }) => {

                                if (!fetchMoreResult) { return previousResult; }
                                console.log(previousResult);
                                console.log(fetchMoreResult);

                                const obj =  Object.assign({}, previousResult, {
                                    // Append the new feed results to the old one
                                    inboxConversation: {messages: [...previousResult.inboxConversation.messages, ...fetchMoreResult.inboxConversation.messages]},
                                });

                                console.log(obj);

                                return fetchMoreResult;
                                //planstore: {plans: [...previousResult.planstore.plans, ...fetchMoreResult.planstore.plans]},


                                const previousEntry = previousResult.inboxConversation;
                                const newComments = fetchMoreResult.inboxConversation.messages;
                                //const newCursor = fetchMoreResult.moreComments.cursor;


                                /*
                                return Object.assign({}, previousResult, {
                                  // Append the new feed results to the old one
                                  planstore: {plans: [...previousResult.planstore.plans, ...fetchMoreResult.planstore.plans]},
                                });
                                 */
                                return {
                                    // By returning `cursor` here, we update the `loadMore` function
                                    // to the new cursor.
                                    //lastCursor: newCursor,

                                    inboxConversation: {
                                        // Put the new comments in the front of the list
                                    },
                                };
                            },
                        });
                    }
                }

            } else {
                return {loading: data.loading, messages:[],totalCount:0}
            }
        },
    }
)(Chat);



const mapStateToProps = (state) => {
    return {
        userId: state.user.info.id
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatWithQuery);