/**
 * Created by Павел on 20.01.2018.
 */

import React from 'react'
import { connect } from 'react-redux'

import Notifications from '../components/Notifications/index';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {MedicationPlan_QUERY} from "../../../../routes/Plan/components/MedicationPlan/containers";
import {message} from "antd/lib/index";
import {BADGE_NOTIFICATIONS_QUERY} from '../components/RightMenu/containers/NotificationBadge'


export const NOTIFICATIONS_QUERY  = gql`
  query GET_NOTIFICATIONS ($cursors: CursorInput!) {
  account {
    user {
      id
      notifications (cursors:$cursors, unread:true) @connection(key: "notifications") {
        totalCount
        edges {
          id
          sender {
            id
            firstName
            color
          }
          patient {
            id
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
}

`;

const withQuery = graphql(NOTIFICATIONS_QUERY, {
    options: (ownProps) => {
        //console.log(ownProps);
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
            const {edges, totalCount, pageInfo: {endCursor}} = data.account.user.notifications;
            //console.log(edges.length < totalCount);
            return {
                notifications: edges,
                endCursor: endCursor,
                loading: data.loading,
                totalCount:totalCount,
                hasMore: edges.length < totalCount,
                loadMore(endCursor, callback) {
                    //console.log(date);
                    return data.fetchMore({
                        variables: {
                            cursors: {before: endCursor, last:10}
                        },
                        updateQuery: (previousResult, { fetchMoreResult }) => {

                            callback();
                            if (!fetchMoreResult) { return previousResult; }


                            const newMessages = [...previousResult.account.user.notifications.edges, ...fetchMoreResult.account.user.notifications.edges]
                            const obj =  Object.assign({}, previousResult, {
                                account: {
                                    ...previousResult.account, user: {
                                        ...previousResult.account.user, notifications: {
                                            ...previousResult.account.user.notifications,
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

export default withMutation(withQuery(Notifications));