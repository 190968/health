
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../../../User/fragments';


const GET_DISCUSSION_QUERY  = gql`
 query GET_DISCUSSION($id:UID) {
   user{
    id
    firstName
    thumbs {
        small
        large
        medium
    }
    fullName
  }
    discussion(id:$id) {
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
}
${UserInfoFragment}
`;