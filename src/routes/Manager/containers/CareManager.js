import CareManager from '../components/CareManager';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {compose, branch, withHandlers, withState, withProps} from 'recompose';

const GET_PROFILE  = gql`
query GET_NETWORKSTAFF($search: String, $role: RoleEnum!, $cursors: CursorInput) {
    management {
      getNetworkStaff(search: $search, role: $role, cursors: $cursors) {
        totalCount
        edges {
          id
          role
          roleTitle
          startDate
          joinedDate
          lastLoginDate
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
          getTotalCareManagers
        }
      }
    }
  }
 `;

const withQuery = graphql(GET_PROFILE, {
    options: (ownProps) => {
        return{
            variables: {
                search:'',
                role:'cm'
            }
        }
    },
    props: ({ data }) => {
        if (!data.loading) {
            console.log(data);
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
    withHandlers({

    })
);

export default enhance(CareManager);