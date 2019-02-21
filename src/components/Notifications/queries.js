import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../../routes/User/fragments';

export const NOTIFICATIONS_QUERY  = gql`
    query GET_NOTIFICATIONS ($cursors: CursorInput, $unread: Boolean, $criticalOnly: Boolean, $excludeCritical: Boolean) {
        account {
            getNotifications (cursors:$cursors, unread: $unread, criticalOnly: $criticalOnly, excludeCritical: $excludeCritical) @connection(key: "notifications") {
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
        const {unread=true, criticalOnly} = ownProps || {};
        let {excludeCritical} = ownProps;
        // if we marked false as critical only. if null - then ignore
        //excludeCritical = criticalOnly === false;
        return {
            variables: {
                unread,
                criticalOnly,
                excludeCritical
            },
            fetchPolicy: 'network-only',
        }
    },
    props: ({ ownProps, data }) => {
        const {getNotifications} = data.account || {};
        const {edges=[], totalCount=0, pageInfo} = getNotifications || {};
        const {endCursor=''} = pageInfo || {};
        return {
            notifications: edges,
            loading: data.loading,
            total:totalCount,
            hasMore: edges.length < totalCount,
            loadMore() {
                return data.fetchMore({
                    variables: {
                        cursors: {before: endCursor, last:20}
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {

                        //callback();
                        if (!fetchMoreResult) { return previousResult; }
                        // console.log(fetchMoreResult);
                        //return previousResult;
                        const newMessages = [...previousResult.account.getNotifications.edges, ...fetchMoreResult.account.getNotifications.edges]
                         console.log(previousResult.account.getNotifications.edges);
                         console.log(fetchMoreResult.account.getNotifications.edges);
                         console.log(newMessages);
                        const obj =  Object.assign({}, previousResult, {
                            account: {
                                ...previousResult.account, getNotifications: {
                                    ...previousResult.account.getNotifications, edges: newMessages
                            }
                        }
                        });
                        console.log(obj);
                        return obj;
                    },
                });
            }
        }
    },
});
