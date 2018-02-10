import React from 'react'
import { connect } from 'react-redux'

import NotificationBadge from '../components/NotificationBadge';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


export const NOTIFICATIONS_QUERY  = gql`
  query GET_NOTIFICATIONS ($cursors: CursorInput!) {
  account {
    user {
      id
      notifications (cursors:$cursors, unread:true, generalTotal:true) @connection(key: "notifications", filter: ["generalTotal"]) {
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
          dateSent
          isCritical
        }
      }
    }
  }
}

`;

const withQuery = graphql(NOTIFICATIONS_QUERY, {
    options: (ownProps) => {
        //console.log(ownProps, 'Loading cursor')
        return {
            //skip: ownProps.loading,// skip query if loading
            variables: {
                cursors: {after: ownProps.lastCursor}
            },
            fetchPolicy: ownProps.loadNew ? 'network-only' : 'cache-only'
        }
    },
    props: ({ ownProps, data }) => {
        //console.log(ownProps);
        //console.log(data);
        const newNotifications = data.account ? data.account.user.notifications : [];
        const totalNewNotifications =  data.account ? data.account.user.notifications.totalCount : 0;
        //console.log(totalNewNotifications, 'total');
        return {loading: data.loading, newNotifications:newNotifications, totalNewNotifications:totalNewNotifications}
    },
});

export default withQuery(NotificationBadge);