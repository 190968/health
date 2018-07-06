import ProvidersManager from '../components/Providers';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {compose, branch, withStateHandlers, withState, withProps} from 'recompose';

export const GET_PROVIDERS_QUERY  = gql`
query GET_PROVIDERS ($search: String, $status: RoleStatusEnum = active) {
  network {
    id
    getProviders(search:$search, status: $status) {
      totalCount
      edges {
        id
        name
        typeText
        getTotalPatients
        getTotalCareGivers:getTotalStaff(role: cm)
        getTotalManagers:getTotalStaff(role: manager)
        getAdherence {
            level
        }
      }
    }
  }
}
 `;

const withQuery = graphql(GET_PROVIDERS_QUERY, {
    props: ({ data }) => {
        if (!data.loading) {
            console.log(data);
            return {
                getProviders: data.network.getProviders,
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

export default enhance(ProvidersManager);