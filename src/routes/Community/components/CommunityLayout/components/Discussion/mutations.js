
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../../../User/fragments';

const discussionReply = gql`
mutation discussionReply($id:UID!,$parentMessageId:UID,$message:String!, $useParent: Boolean!) {
    discussionReply(id:$id,parentMessageId:$parentMessageId,message:$message) {
        discussion @skip(if: $useParent) {
            id
            title
            text
            createdAt
            category {
            id
            isJoined
            canJoin
            name
            }
            author {
                ...UserInfo
            }
            views
            replies {
                totalCount
                edges {
                        id
                        text
                        date
                        createdAt
                        isImportant
                        unread
                        author {
                            ...UserInfo
                        }
                        replies {
                        totalCount
                        edges{
                                id
                                text
                                date
                                createdAt
                                isImportant
                                unread
                                author {
                                    ...UserInfo
                                }
                        }
                    }    
                }
            }      
        }
        parentComment @include(if: $useParent) {
            id
            text
            date
            createdAt
            isImportant
            unread
            author {
                ...UserInfo
            }
            replies {
                totalCount
                edges{
                    id
                    text
                    date
                    createdAt
                    isImportant
                    unread
                    author {
                        ...UserInfo
                    }
                }
            } 
        }
    }
}
${UserInfoFragment}
`;

export const withDiscussionReplyMutation = graphql(discussionReply, {
    props: ({ mutate, ownProps }) => ({
        discussionReply: (text,id,parentMessageId) => {
            return mutate({
                variables:  {
                    id: id,
                    message: text,
                    parentMessageId:parentMessageId,
                    useParent: parentMessageId && parentMessageId !== '' ? true : false
                }
            })
        },
    }),
});