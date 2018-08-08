import DashLayout from '../components/DashLayout'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withCurrentUser } from '../../../queries/user';

export const GET_CURRENT_ROLE_QUERY = gql`
    query GET_CURRENT_ROLE {
      account {
         currentRole
      }
    }
`;


export default withCurrentUser(DashLayout);