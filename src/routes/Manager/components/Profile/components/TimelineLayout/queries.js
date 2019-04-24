import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { TimelineElementFragment } from './timeline_fragments';

export const GET_TIMELINE_QUERY = gql`
 query GET_TIMELINE($userId:UID!, $cursors:CursorInput, $filters:[String]) {
   getTimeline (userId: $userId, cursors: $cursors, filters:$filters )  @connection(key: "timelineElementsConnection", filter: ["filters"]) {
        totalCount
        edges{
             ...TimelineElement
        }
        pageInfo {
            endCursor
        }
   }
}
${TimelineElementFragment}
`;


export const withTimelineQuery = graphql(GET_TIMELINE_QUERY, {
	options: (ownProps) => {
		return {
			variables: {
				userId: ownProps.user.id,
				filters: ownProps.filters
			},
            //fetchPolicy: 'network-only',
            //notifyOnNetworkStatusChange: false
		}
	},
	props: ({ ownProps, data }) => {
		if (!data.loading) {
			const { edges = [], totalCount = 0, pageInfo = {} } = data.getTimeline || {};
			const { endCursor = '' } = pageInfo;
			return {
				items: edges,
				endCursor: endCursor,
				loading: data.loading,
				totalCount: totalCount,
				hasMore: edges.length < totalCount,
				refetchTimeline: data.refetch,
				loadFiltered(filters) {
					return data.refetch({filters});
				},

				loadMore(endCursor, callback) {
					return data.fetchMore({
						variables: {
							cursors: { before: endCursor, last: 10 }
						},
						updateQuery: (previousResult, { fetchMoreResult }) => {
							callback();

							if (!fetchMoreResult) {
								return previousResult;
							}

							const newItems = [
								...previousResult.getTimeline.edges,
								...fetchMoreResult.getTimeline.edges
							];
							const obj = Object.assign({}, previousResult, {
								getTimeline: {
									...previousResult.getTimeline,
									edges: newItems
								}
							});
							return obj;
						}
					});
				}
			};
		} else {
			return { loading: data.loading };
		}
	}
});