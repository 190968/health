import { connect } from 'react-redux'
import MenuBadges from '../components/MenuBadges/index.js';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const NOTIFICATIONS_POOL_QUERY  = gql`
   query NOTIFICATIONS_POOL ($cursors: CursorInput!) {
      account {
        user {
          id
          notifications (cursors:$cursors) @connection(key: "notificationPool") {
            totalCount
            pageInfo {
              endCursor
            }
          }
        }
      }
    }
`;

const withQuery = graphql(NOTIFICATIONS_POOL_QUERY, {
    options: (ownProps) => {
        //console.log(ownProps.lastNotification, 'LastNotification');
        return {
            //forceFetch: true,
            variables: {
                cursors: {first:1, after:ownProps.lastNotificationCursor},// last cursor for notifications
            },
            pollInterval: 10000,
            fetchPolicy: 'network-only',
            //notifyOnNetworkStatusChange: true// adding loading placeholder
        }
        },
    props: ({ ownProps, data }) => {


        const lastCursor = !data.loading && data.account.user.notifications.pageInfo.endCursor != '' ?  data.account.user.notifications.pageInfo.endCursor : ownProps.lastNotificationCursor;
        const totalCount = !data.loading && data.account.user.notifications.totalCount;

        return {loading: data.loading, newCursor:lastCursor, newNotificationsNum: totalCount}

    },
});




const mapStateToProps = (state) => {
    return {
        messages: state.user.info.unreadMessages,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(withQuery(MenuBadges));