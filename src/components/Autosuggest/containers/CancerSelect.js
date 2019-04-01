import CancerSelect from '../components/CancerSelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const PlansListQUERY = gql`
    query GET_CANCERS_LIST ($search: String)  {
        health {
            getCancersList (search: $search) {
                id
                title
            }
        }
    }
`;

const CancerSelectWithQuery = graphql(PlansListQUERY,
    {
        options: () => {
            return {
                fetchPolicy: 'network-only'
            }
        },
        props: ({ data }) => {
            const {getCancersList=[]} = data.health || {};
                return {
                    items: getCancersList,
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
        },

    }
)(CancerSelect);

export default CancerSelectWithQuery;