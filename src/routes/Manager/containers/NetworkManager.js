import NetworkManager from '../components/NetworkManager';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {compose, branch, withStateHandlers, withState, withProps} from 'recompose';

export const GET_NETWORK_MANAGERS_LIST  = gql`
query GET_NETWORKSTAFF($search: String, $role: RoleEnum!, $cursors: CursorInput, $status: RoleStatusEnum) {
    management {
      getNetworkStaff(search: $search, role: $role, cursors: $cursors, status: $status) {
        totalCount
        edges {
          id
          role
          roleTitle
          startDate
          joinedDate
          lastLoginDate
          invitedDate
          accessLevel
          user {
            id
            firstName
            lastName
            fullName
            phone{
              code
              number
            }
          }
          getTotalPatients
        }
      }
    }
  }
  
 `;

const withQuery = graphql(GET_NETWORK_MANAGERS_LIST, {
    options: (ownProps) => {
        return{
            variables: {
                search:'',
                role:'manager',
                status:'active',  
            }
        }
    },
    props: ({ data }) => {
        if (!data.loading) {
            return {
                management: data.management.getNetworkStaff,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});

const enhance = compose(
    withQuery,
    withStateHandlers(
        (props) => ({
        showButton: false,
        selectedCount:0
        }),
        {
            openShowButton: ({ counter }) => (value) => ({
                showButton: true,
                selectedCount:value
            }),
            hideShowButton: ({ counter }) => (value) => ({
                showButton: false
            }),
        }
        )
);

export default enhance(NetworkManager);