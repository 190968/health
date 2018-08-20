import { connect } from 'react-redux'
import MenuBadges from '../components/MenuBadges/index.js';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {notification} from 'antd';

export const NOTIFICATIONS_POOL_QUERY  = gql`
   query NOTIFICATIONS_POOL ($cursors: CursorInput!) {
      account {
        currentToken {
          token
          isExpired
        }
        getNotifications (cursors:$cursors, unread:true) @connection(key: "notificationPool") {
            totalCount
            pageInfo {
              endCursor
            }
        }
        unreadMessages
      }
    }
`;
// currentToken {
//     token
//     isExpired
// }
const withQuery = graphql(NOTIFICATIONS_POOL_QUERY, {
    options: (ownProps) => {

        console.log(ownProps, 'Own Props pool notifications');
        const {currentUser={}} = ownProps;
        const {token=''} = currentUser;
        console.log(token, 'TOKEN IN MENU BADGES');
        const userExists = token !== '';
        console.log(userExists);
        return {
            //skip: !userExists,
            //forceFetch: true,
            variables: {
                cursors: {first:1, after:ownProps.lastNotificationCursor},// last cursor for notifications
            },
            //delay:true,
            //pollInterval: 5000,
            pollInterval: 10000,// 10 seconds check
            //fetchPolicy: !userExists ? 'cache-only' : 'cache-and-network',
            //notifyOnNetworkStatusChange: true// adding loading placeholder
        }
        },
    props: ({ ownProps, data }) => {

        console.log(data, 'DATA FROM POOL');
        const {account={}, loading} = data;
        const {getNotifications={}, unreadMessages, currentToken={}} = account;

       // const lastCursor = !data.loading && user.notifications.pageInfo.endCursor !== '' ?  user.notifications.pageInfo.endCursor : ownProps.lastNotificationCursor;
        const {totalCount, pageInfo={}} = getNotifications || {};
        const {endCursor=''} = pageInfo || {};
        let lastCursor = endCursor;
        if (endCursor === '') {
            lastCursor = ownProps.lastNotificationCursor
        }
        let {token='', isExpired} = currentToken;
        if (isExpired) {
            token = '';
        }
        console.log('TOKEN FROM POOL', token);
        // get current token:
        //const {currentUser={}} = ownProps;
        //const {token=''} = currentUser;
        if (isExpired) {
            //console.log(currentToken, 'EXPIRED TOKEN HERE')
            // if expired, then 
            //console.log('TOKEN EXPIRED. DO SMTH');
            
            
            //
        }

        return {loading: loading, token, tokenIsExpired:isExpired, unreadMessages:unreadMessages, newCursor:lastCursor, newNotificationsNum: totalCount}

    },
});

//export default (MenuBadges);
export default withQuery(MenuBadges);