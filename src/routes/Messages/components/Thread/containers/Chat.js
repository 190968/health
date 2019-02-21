import Chat from '../components/Chat';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../../User/fragments';
import { compose, withState } from 'recompose';
import { withActiveUser } from '../../../../../components/App/app-context';


export const GET_CONVERSATION_MESSAGES_QUERY = gql`    
    query GET_CONVERSATION_MESSAGES ($id: UID!, $cursors: CursorInput) {
      account {
        inboxConversation (id:$id) {
          id
          subject
          unreadMessages
          messages (cursors:$cursors) @connection(key: "messages") {
            totalCount
            pageInfo {
                endCursor
                startCursor
            }
            edges {
                id
                text
                isRead
                sender {
                    ...UserInfo
                }
                sentAt
              }
          }
        }
      }
    }
    ${UserInfoFragment}
`;

const withQuery = graphql(
    GET_CONVERSATION_MESSAGES_QUERY,
    {
        options: (ownProps) => {
            const {lastCursor=''} = ownProps;
            return {
                skip: !ownProps.id,
                variables: {
                    id: ownProps.id,
                    cursors: {before: lastCursor, last:20}
                },
                //pollInterval: 5000,
                fetchPolicy: 'network-only'
            }

        },
        props: ({ ownProps, data }) => {
            console.log(data);
            const {inboxConversation} = data.account || {};
            const {messages, subject} = inboxConversation || {};
            const {edges=[], totalCount=0, pageInfo} = messages || {};
            const {endCursor='', startCursor} = pageInfo || {};
            



               
                // console.log(edges.length < totalCount, 'edges.length < totalCount');
                console.log(pageInfo, 'pageInfo');
                console.log(startCursor, 'startCursor');
                console.log(edges, 'edges');
                return {
                    subject: subject,
                    messages: edges,
                    totalCount: totalCount,
                    hasMore: edges.length < totalCount,
                
                    loading: data.loading,
                    refetch: data.refetch,

                    loadMore(callback) {
                        console.log(startCursor, 'startCursor');
                        return data.fetchMore({
                            variables: {
                                cursors: {before: startCursor, last:20}
                            },
                            updateQuery: (previousResult, { fetchMoreResult }) => {

                                
                                //callback();
                                if (!fetchMoreResult) { return previousResult; }
                                //return previousResult;
                                // console.log(previousResult);
                                // console.log(fetchMoreResult);
                                // console.log(1111);
                                const newMessages = [...fetchMoreResult.account.inboxConversation.messages.edges, ...previousResult.account.inboxConversation.messages.edges]
                                const newPageInfo = {...previousResult.account.inboxConversation.messages.pageInfo, ...fetchMoreResult.account.inboxConversation.messages.pageInfo}
                                 const newStartCursor = fetchMoreResult.account.inboxConversation.messages.pageInfo.startCursor;
                                // console.log(newMessages, 'newMessages');
                                // console.log(newPageInfo, 'newPageInfo');

                                const newAccount = {
                                    ...previousResult.account, inboxConversation: {
                                        ...previousResult.account.inboxConversation, messages: {
                                                ...previousResult.account.inboxConversation.messages, edges:newMessages,
                                                pageInfo: {...newPageInfo, startCursor:newStartCursor }
                                            },
                                            
                                        
                                        }
                                    };
                                
                                const obj =  Object.assign({}, previousResult, {
                                    account: newAccount
                                });
                                // console.log(previousResult, 'Previous account');
                                // console.log(obj, 'new account');
                                
                                return obj;
                            },
                        });
                    },
                    // loadMoreEntries: (lastCursor) => {
                    //     console.log(lastCursor, 'lastCursor');
                    //     return data.fetchMore({
                    //         query: GET_CONVERSATION_MESSAGES_QUERY,
                    //         variables: {
                    //             id: ownProps.id,
                    //             cursors: {after: lastCursor}
                    //         },
                    //         updateQuery: (previousResult, { fetchMoreResult }) => {

                    //             if (!fetchMoreResult) { return previousResult; }
                    //             const newMessages = [...previousResult.account.inboxConversation.messages.edges, ...fetchMoreResult.account.inboxConversation.messages.edges]
                    //             // add total count
                    //             const obj =  Object.assign({}, previousResult, {
                    //                 account: {
                    //                     ...previousResult.account, inboxConversation:
                    //                         {...previousResult.account.inboxConversation, messages: { ...previousResult.account.inboxConversation.messages , edges: newMessages}}
                    //                 }
                    //             });

                    //             return obj;
                    //         },
                    //     });
                    // }
                }
        },
    }
);

const enhance = compose(
    withState('lastCursor', 'setLastCursor', ''),
    withActiveUser,
    withQuery
);

export default enhance(Chat);