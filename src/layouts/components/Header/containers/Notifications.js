/**
 * Created by Павел on 20.01.2018.
 */

//import React from 'react'

import Notifications from '../components/Notifications/index';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../../routes/User/fragments';


export const NOTIFICATIONS_QUERY  = gql`
  query GET_NOTIFICATIONS ($cursors: CursorInput) {
  account {
      getNotifications (cursors:$cursors, unread:true) @connection(key: "notifications") {
        totalCount
        edges {
          id
          sender {
            ...UserInfo
          }
          patient {
            ...UserInfo
          }
          text
          isApproved
          isRequest
          dateSent
          isCritical
        }
        pageInfo {
              endCursor
            }
      }
  }
}
${UserInfoFragment}
`;

export const withNotificationsQuery = graphql(NOTIFICATIONS_QUERY, {
    options: (ownProps) => {

        return {
            variables: {
                cursors: {after: ''/*ownProps.lastCursor*/}
            },
            //notifyOnNetworkStatusChange: true,
            //pollInterval: 5000,
            fetchPolicy: 'network-only'
        }

    },
    props: ({ ownProps, data }) => {
        if (!data.loading) {
            const {getNotifications={}} = data.account;
            const {edges=[], totalCount=0, pageInfo={}} = getNotifications || {};
            const {endCursor=''} = pageInfo || {};
            return {
                notifications: edges,
                endCursor: endCursor,
                loading: data.loading,
                totalCount:totalCount,
                hasMore: edges.length < totalCount,
                loadMore(endCursor, callback) {
                    //console.log('Loading more');
                    return data.fetchMore({
                        variables: {
                            cursors: {before: endCursor, last:10}
                        },
                        updateQuery: (previousResult, { fetchMoreResult }) => {

                            callback();
                            if (!fetchMoreResult) { return previousResult; }
                            //return previousResult;
                            const newMessages = [...previousResult.account.getNotifications.edges, ...fetchMoreResult.account.getNotifications.edges]
                            const obj =  Object.assign({}, previousResult, {
                                account: {
                                    ...previousResult.account, getNotifications: {
                                        ...previousResult.account.getNotifications, getNotifications: {
                                            ...previousResult.account.getNotifications,
                                            edges: newMessages
                                        }
                                }
                            }
                            });
                            return obj;
                        },
                    });
                }
            }
        }
        else {
            return {loading: data.loading, notifications: [], totalCount:0, endCursor:'', hasMore:false}
        }
    },
});


const handleNotification_Mutation = gql`
mutation HandleNotification($id: UID!, $approved: Boolean!) {
  handleNotification(id: $id, approved: $approved) {
    id
    action
    actionId
    userId
    date
  }
}
`;

const withMutation = graphql(handleNotification_Mutation, {
    props: ({mutate}) => ({
        handleNotification: (id, approved) => {
            return mutate({
                variables: {id:id, approved:approved},
                refetchQueries: [
                    {
                        query: NOTIFICATIONS_QUERY,
                        variables: {cursors: {after: ''}}
                    }


                ],
            })
        },
    }),
});

export default withNotificationsQuery(withMutation(Notifications));