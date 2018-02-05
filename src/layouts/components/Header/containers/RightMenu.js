import { connect } from 'react-redux'
import RightMenu from '../components/RightMenu';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const NOTIFICATIONS_POOL  = gql`
   query NOTIFICATIONS_POOL {
      account {
        user {
        id
          notifications {
            totalCount,
            pageInfo {
              endCursor
            }
            edges {
              id
              user {
                id
              }
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

const withQuery = graphql(NOTIFICATIONS_POOL, {
    options: (ownProps) => {
        //console.log(ownProps);
        return {
            forceFetch: true,
            variables: {
                cursor: ownProps.endCursor,// last cursor for notifications
            },
            //pollInterval: 50000,
            fetchPolicy: 'network-only',
            notifyOnNetworkStatusChange: true// adding loading placeholder
        }
        },
    props: ({ ownProps, data }) => {
        //console.log(data);
        if (!data.loading) {
            return {
                endCursor: data.account.user.notifications.pageInfo.endCursor,
                startPolling : data.startPolling,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});




const mapStateToProps = (state) => {
    //console.log(state.network);
    //console.log(state.user);
    return {
        // view store:
        //currentView:  state.views.currentView,
        // userAuth:
        messages:    state.user.info.unreadMessages,
        notifications:    state.user.info.unreadNotifications,
        network:    state.network,
        //loading: state.user.loading,
        user: state.user.info,
        token: state.user.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default  withQuery(connect(
    mapStateToProps,
    mapDispatchToProps
)(RightMenu));