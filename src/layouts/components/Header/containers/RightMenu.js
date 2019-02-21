import RightMenu from '../components/RightMenu';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withActiveUser } from '../../../../components/App/app-context';

export default  withActiveUser(RightMenu);