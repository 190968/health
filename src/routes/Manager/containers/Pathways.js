import Pathways from '../components/Pathways';
import {compose} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const GET_PATHWAYS_QUERY = gql`    
    query GET_PATHWAYS ($search: String, $status: PlanStatusEnum) {
        getPathways (status: $status, search: $search) {
            totalCount
            edges {
                id
                title
                cancer {
                    id
                    title
                }
                createdOn
                creator {
                    id
                    fullName
                }
                status
                statusText
            }
        }
    }
`;

// 1- add queries:
const withQuery = graphql(
    GET_PATHWAYS_QUERY,
    {
        //name: 'PlanstorePlans',
        options: (ownProps) => {
            return {
                //skip: !ownProps.ready,
                variables: {
                    search: null,
                    status: null
                    //date:ownProps.date
                },
                fetchPolicy: 'network-only'
            }

        },
        props: ({ ownProps, data }) => {
                const {getPathways, variables} = data;
                const {edges, totalCount} = getPathways || {};
                const {search} = variables || {};
                const filterUsed = search !== '';
                console.log(data, 'data');
                return {
                    pathways: edges,
                    total: totalCount,
                    loading: data.loading,
                    search,
                    filterUsed:filterUsed,
                    refetch:data.refetch,
                    loadByStatus(status) {
                        return data.refetch({status});
                        // return data.fetchMore({
                        //     // query: ... (you can specify a different query. FEED_QUERY is used by default)
                        //     variables: {
                        //         user_id:ownProps.user_id,
                        //         status:status
                        //     },
                        //     updateQuery: (previousResult, {fetchMoreResult}) => {
                        //         if (!fetchMoreResult) { return previousResult; }
                        //         return fetchMoreResult;
                        //     },
                        // });
                    },
                    doSearch(search) {
                        return data.refetch({search});
                    },
                    loadMoreEntries() {

                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
                            variables: {
                                // We are able to figure out which offset to use because it matches
                                // the feed length, but we could also use state, or the previous
                                // variables to calculate this (see the cursor example below)
                                page: ownProps.page+1,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                if (!fetchMoreResult) { return previousResult; }

                                return fetchMoreResult;
                                return Object.assign({}, previousResult, {
                                    // Append the new feed results to the old one
                                    planstore: {plans: [...previousResult.planstore.plans, ...fetchMoreResult.planstore.plans]},
                                });
                            },
                        });
                    }
                }

        },
    }
);
const enhance = compose(
    withQuery
);

export default enhance(Pathways);