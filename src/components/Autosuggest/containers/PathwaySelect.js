import PathwaySelectPure from '../components/PathwaySelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

 const PlansListQUERY = gql`
    query GET_PATHWAYS_LIST ($search: String, $status: PlanStatusEnum)  {
        getPathways(search: $search, status:$status) {
            edges {
                id
                title
            }
        }
    }
`;

 const withPlansSelectQuery = graphql(PlansListQUERY,
    {
        options: () => {
            return {
                fetchPolicy: 'network-only'

            }},
        options: (ownProps) => {
            // const {filters} = ownProps || {};
            return {
                variables: {
                    search: null,
                    status: 'published'
                },
                fetchPolicy: 'network-only',
            }
        },
        props: ({ data }) => {
            const {getPathways} = data || {};
            const {edges=[], totalCount=0} = getPathways || {};
                return {
                    items: edges,
                    total: totalCount,
                    loading: data.loading,

                    doSearch(search) {
                        return data.refetch({search: search});
                    }
                }
        },

    }
);

export const PathwaySelect = withPlansSelectQuery(PathwaySelectPure);