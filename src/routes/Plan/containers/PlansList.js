import { PlansList } from '../components/PlansList'
import { compose, withHandlers } from 'recompose';


import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ifModuleExists, withActiveUser } from '../../../components/App/app-context';
import { PlanCardFragment } from '../components/Plan/fragments';
import { UserInfoFragment } from '../../User/fragments';

export const USER_PLANS_LIST_QUERY = gql`    
    query GET_USER_PLANS ($user_id:UID, $date: Date, $status:UserPlanStatusEnum)  {
            user (id:$user_id) {
              id
              plans (status: $status)  {
                  id
                  startDate
                  endDate
                  endsIn
                  lastUsedDate
                  sender {
                    ...UserInfo
                  }
                  invitationDate
                  isCompleted
                  progress
                  completedDate 
                  completedBy {
                    ...UserInfo
                  }
                  isDeleted
                  deletedDate
                  deletedBy {
                    ...UserInfo
                  }
                  plan {
                    ...PlanCardInfo
                    progress(date: $date)
                  }
              }
            }
    }
    ${PlanCardFragment}
    ${UserInfoFragment}
`;

//const PLANS_PER_PAGE = 20;

// 1- add queries:
const withQuery = graphql(
  USER_PLANS_LIST_QUERY,
  {
    //name: 'PlanstorePlans',
    options: (ownProps) => {
      const {id} = ownProps.user || {};
      return {
        //skip: !ownProps.ready,
        variables: {
          user_id: id,
          status: 'active',
          date: ownProps.date
        },
        // fetchPolicy: 'network-only'
      }

    },
    props: ({ ownProps, data }) => {
      if (!data.loading) {
        const {plans=[]} = data.user || {};
        return {
          plans: plans,
          totalCount: plans.length,
          //modules: data.network.modules,
          loading: data.loading,
          loadByStatus(status) {
            return data.refetch({
              status: status
            });
          },
          loadMoreEntries() {

            return data.fetchMore({
              // query: ... (you can specify a different query. FEED_QUERY is used by default)
              variables: {
                // We are able to figure out which offset to use because it matches
                // the feed length, but we could also use state, or the previous
                // variables to calculate this (see the cursor example below)
                page: ownProps.page + 1,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) { return previousResult; }

                return fetchMoreResult;
              },
            });
          }
          /*increment() {
               ownProps.increment(data.plans['actionplans']);
          },
          doubleAsync() {
               // reset list of plans
              ownProps.increment([]);
          }*/
        }

      } else {
        return { loading: data.loading }
      }
    },
  }
);

export default compose(
  ifModuleExists('aps'),
  withQuery,
  withActiveUser,
  withHandlers({
    handleStatus: props => (e) => {
      props.loadByStatus(e.key);
    }
  })
)(PlansList);