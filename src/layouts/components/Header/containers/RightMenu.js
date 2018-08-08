import RightMenu from '../components/RightMenu';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withCurrentUser } from '../../../../queries/user';

export default  withCurrentUser(RightMenu);