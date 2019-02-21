import { compose, lifecycle, withHandlers } from 'recompose';
import { withLoadingButton } from '../../../../components/Loading';
import { withNotificationsQuery } from '../../../../components/Notifications/queries';
import { withCurrentUser } from '../../../../queries/user';
import Notifications from '../components/Notifications';

// export const NOTIFICATIONS_QUERY  = gql`
//   query GET_NOTIFICATIONS ($cursors: CursorInput, $criticalOnly: Boolean) {
//   account {
//       getNotifications (cursors:$cursors, unread:true, criticalOnly: $criticalOnly) @connection(key: "notifications") {
//         totalCount
//         edges {
//           id
//           sender {
//             ...UserInfo
//           }
//           patient {
//             ...UserInfo
//           }
//           text
//           isApproved
//           isRequest
//           dateSent
//           isCritical
//         }
//         pageInfo {
//               endCursor
//             }
//       }
//   }
// }
// ${UserInfoFragment}
// `;

// const withQuery = graphql(NOTIFICATIONS_QUERY, {
//     options: (ownProps) => {
//         return {
//             fetchPolicy: 'network-only'
//         }

//     },
//     props: ({ ownProps, data }) => {
//         if (!data.loading) {
//             const {getNotifications={}} = data.account;
//             const {edges=[], totalCount=0, pageInfo} = getNotifications || {};
//             const {endCursor=''} = pageInfo || {};
//             return {
//                 notifications: edges,
//                 //endCursor: endCursor,
//                 loading: data.loading,
//                 totalCount:totalCount,
//                 hasMore: edges.length < totalCount,
//                 loadMore() {
//                     //console.log('Loading more');
//                     return data.fetchMore({
//                         variables: {
//                             cursors: {before: endCursor, last:10}
//                         },
//                         updateQuery: (previousResult, { fetchMoreResult }) => {

//                             //callback();
//                             if (!fetchMoreResult) { return previousResult; }
//                             //return previousResult;
//                             const newMessages = [...previousResult.account.getNotifications.edges, ...fetchMoreResult.account.getNotifications.edges]
//                             const obj =  Object.assign({}, previousResult, {
//                                 account: {
//                                     ...previousResult.account, getNotifications: {
//                                         ...previousResult.account.getNotifications, getNotifications: {
//                                             ...previousResult.account.getNotifications,
//                                             edges: newMessages
//                                         }
//                                 }
//                             }
//                             });
//                             return obj;
//                         },
//                     });
//                 }
//             }
//         }
//         else {
//             return {loading: data.loading, notifications: [], totalCount:0, endCursor:'', hasMore:false}
//         }
//     },
// });
 




const enhance = compose(
    withCurrentUser,
    withLoadingButton,
    withNotificationsQuery,
    
    withHandlers({
        handleInfiniteOnLoad: props => () => {
            props.setLoadingButton(true);
            props.loadMore();
        }
    }),
    lifecycle({
        componentWillReceiveProps(nextProps) {
            if (!nextProps.loading && nextProps.totalCount !== this.props.totalCount) {
                if (this.props.handleTotalNewNotifications)
                    this.props.handleTotalNewNotifications(nextProps.totalCount);
            }
        }
    })
);

export default enhance(Notifications);