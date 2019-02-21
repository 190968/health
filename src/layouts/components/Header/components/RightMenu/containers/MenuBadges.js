import MenuBadges from '../components/MenuBadges/index.js';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { notification } from 'antd';
import { compose, lifecycle } from 'recompose';

export const NOTIFICATIONS_POOL_QUERY = gql`
   query NOTIFICATIONS_POOL ($cursors: CursorInput!) {
      account {
        currentToken {
          token
          isExpired
        }
        getNotifications (cursors:$cursors, excludeCritical:true, unread:true) @connection(key: "notificationPool", filter: ["excludeCritical"]) {
            totalCount
            pageInfo {
              endCursor
            }
        }
        criticalNotifications:getNotifications (cursors:$cursors, criticalOnly:true, unread:true) @connection(key: "notificationPool", filter: ["criticalOnly"]) {
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
        return {
            variables: {
                cursors: { first: 1, after: ownProps.lastNotificationCursor },// last cursor for notifications
            },
            //delay:true,
            //pollInterval: 5000,
            //pollInterval: 10000,// 10 seconds check
            //fetchPolicy: !userExists ? 'cache-only' : 'cache-and-network',
            //notifyOnNetworkStatusChange: true// adding loading placeholder
        }
    },
    props: ({ ownProps, data }) => {

        //console.log(data, 'DATA FROM POOL');
        const { account, loading } = data;
        const { getNotifications, criticalNotifications, unreadMessages, currentToken } = account || {};

        // const lastCursor = !data.loading && user.notifications.pageInfo.endCursor !== '' ?  user.notifications.pageInfo.endCursor : ownProps.lastNotificationCursor;
        const { totalCount, pageInfo } = getNotifications || {};
        const { totalCount: criticalTotal, pageInfo: criticalPageInfo } = criticalNotifications || {};
        const { endCursor = '' } = pageInfo || {};
        let lastCursor = endCursor;
        if (endCursor === '') {
            lastCursor = ownProps.lastNotificationCursor
        }
        let { token = '', isExpired } = currentToken || {};
        if (isExpired) {
            token = '';
        }
        return { loading, token, tokenIsExpired: isExpired, unreadMessages: unreadMessages, criticalTotal, newCursor: lastCursor, notCriticalTotal: totalCount }

    },
});

const enhance = compose(
    withQuery,
    lifecycle({
        componentWillReceiveProps(nextProps) {
            // console.log(nextProps);
            // console.log(this.props);
            const { currentUser = {} } = this.props;
            const { token = '' } = currentUser;
            // console.log(nextProps);
            // console.log(this.props);
            if (nextProps.tokenIsExpired && token !== '' && nextProps.token !== token) {
                // reload to logout

                console.log('RESET TOKEN FROM HEADER');
                //this.props.updateCurrentUserInfo({token: ''});
                //console.log(nextProps);
                notification['warning']({
                    message: 'You have been logged out',
                    description: 'Your session is expired. Please Re-Login',
                });
                //this.props.history.push('/logout');
            }
        }
    })
)

export default enhance(MenuBadges);