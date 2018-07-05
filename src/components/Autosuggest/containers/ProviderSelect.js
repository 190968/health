import ProviderSelectPure from '../components/ProviderSelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { GET_PROVIDERS_QUERY } from '../../../routes/Manager/containers/Providers';

const ProviderSelectWithQuery = graphql(GET_PROVIDERS_QUERY,
    {
        options: () => {
            return {
                //fetchPolicy: 'network-only'
            }
        },
        props: ({ data }) => {
            if (!data.loading) {
                return {
                    items: data.network.getProviders.edges,
                    loading: data.loading,

                    doSearch(search) {
                        return data.fetchMore({
                            variables: {
                                search: search,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                if (!fetchMoreResult) { return previousResult; }
                                return (fetchMoreResult);
                            },
                        });
                    }
                }
            } else {
                return {loading: data.loading}
            }
        },

    }
)(ProviderSelectPure);

export const ProviderSelect = ProviderSelectWithQuery;
export default ProviderSelect;