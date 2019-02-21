import Main from '../components/Main';
import {compose} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withNetworkProgramsQuery } from '../../../queries';
 




const enhance = compose(
    withNetworkProgramsQuery
);

export const ProgramsCatalogMain = enhance(Main);
export default ProgramsCatalogMain