import TasksPure from '../components/Tasks';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withHandlers } from 'recompose';
import { TaskInfoFragment } from '../../../../routes/Manager/components/Tasks/fragments';
import { withLoadingButton } from '../../../../components/Loading';
import { withCurrentUser } from '../../../../queries/user';


const GET_ACCOUNT_TASKS_QUERY = gql`
    query GET_ACCOUNT_TASKS {
            management {
                getTasks {
                    totalCount
                    edges {
                        ...TaskInfo
                    }
                }
            }
    }
    ${TaskInfoFragment}
`;

export const withNotificationsQuery = graphql(GET_ACCOUNT_TASKS_QUERY, {
    options: (ownProps) => {
        return {
            // variables: {
            //     cursors: {after: ''/*ownProps.lastCursor*/}
            // },
            fetchPolicy: 'network-only'
        }
    },
    props: ({ ownProps, data }) => {
            const {getTasks} = data.management || {};
            const {edges=[], totalCount=0, pageInfo} = getTasks || {};
            const {endCursor=''} = pageInfo || {};
            return {
                tasks: edges,
                //endCursor: endCursor,
                loading: data.loading,
                totalCount:totalCount,
                hasMore: edges.length < totalCount,
                loadMore() {
                    return data.fetchMore({
                        variables: {
                            cursors: {before: endCursor, last:10}
                        },
                        updateQuery: (previousResult, { fetchMoreResult }) => {

                            if (!fetchMoreResult) { return previousResult; }

                            return fetchMoreResult;
                            //return previousResult;
                            const updatedTasks = [...previousResult.account.user.getTasks.edges, ...fetchMoreResult.account.user.getTasks.edges]
                            const obj =  Object.assign({}, previousResult, {
                                account: {
                                    ...previousResult.account, getNotifications: {
                                        ...previousResult.account.getNotifications, getNotifications: {
                                            ...previousResult.account.getNotifications,
                                            edges: updatedTasks
                                        }
                                }
                            }
                            });
                            return obj;
                        },
                    });
                }
            }
    },
});

 

const enhance = compose(
    withNotificationsQuery,
    withCurrentUser,
    withLoadingButton,
         
    withHandlers({
        handleInfiniteOnLoad: props => () => {
            props.setLoadingButton(true);
            props.loadMore(props.endCursor, props.stopLoading).then(() => {
                props.setLoadingButton(false);
            });
        }
    }),
    // lifecycle({
    //     componentWillReceiveProps(nextProps) {
    //         if (!nextProps.loading && nextProps.totalCount !== this.props.totalCount) {
    //             if (this.props.handleTotalNewNotifications)
    //                 this.props.handleTotalNewNotifications(nextProps.totalCount);
    //         }
    //     }
    // })

);


export const AccountTasks = enhance(TasksPure);
//export default (withMutation(TasksPure));