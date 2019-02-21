import ProviderSelectPure from '../components/ProviderSelect';
import { graphql } from 'react-apollo';
import { GET_PROVIDERS_QUERY } from '../../../routes/Manager/components/Providers/queries';

const withQuery = graphql(GET_PROVIDERS_QUERY,
    {
        props: ({ data }) => {

            const {getProviders} = data.network || {};
            const {edges, totalCount} = getProviders || {};
                return {
                    items: edges,
                    total: totalCount,
                    loading: data.loading,
                    doSearch(search) {
                        return data.refetch({search});
                    }
                }
        },
    }
);

export const ProviderSelect = withQuery(ProviderSelectPure);
export default ProviderSelect;