import TimelinePure from '../components/Timeline';
import React from 'react';
import { graphql } from 'react-apollo';
import { GET_TIMELINE_QUERY } from '../queries';
import { compose, withHandlers, withStateHandlers, defaultProps, branch, renderComponent } from 'recompose';
import { DropTarget } from 'react-dnd';
import { withSpinnerWhileLoading } from '../../../../../../../components/Modal';

const withQuery = graphql(GET_TIMELINE_QUERY, {
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

/** START DROPPABLE */
const droppableTimeline = props => {
	const {connectDropTarget} = props;
	console.log(props, 'dddrrrrop');
    //const isActive = canDrop && isOver;
    return connectDropTarget(<div><TimelinePure {...props} /></div>);
}

const boxTarget = {
	drop() {
		return { name: 'Timeline' };
	}
};

const withDroppable = DropTarget('timelineElement', boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))(droppableTimeline);
/** END DROPPABLE */

const enhance = compose(
    withQuery,
	defaultProps({
		droppable: false,
		draggable: false,
		items: [],
		totalCount: 0,
		endCursor: '',
		hasMore: false
	}),
	withStateHandlers(
		(props) => {
			const { filters } = props;
			// console.log(props);
			return {
				openAddElement: false,
				elementType: '',
				filters,
				//showFilters: false
			};
		},
		{
			// toggleFilter: (props) => () => {
			// 	return { showFilters: !props.showFilters };
			// },
			updateFilters: (state, props) => (filters) => {
                props.loadFiltered(filters);
				return { filters };
			},

			hideTimelineEl: (props) => () => {
				//console.log(props);
				//props.refetchTimeline();
				return { openAddElement: false, elementType: '' };
			},

			onSelectElement: (props) => (type) => {
				// console.log(type,'onSelectElement');
				return { openAddElement: true, elementType: type };
			}
		}
    ),
    
    withSpinnerWhileLoading,
	withHandlers({
		hideTimelineElement: (props) => () => {
			//console.log(props);
			props.refetchTimeline();
			//return {openAddElement:false, elementType:''}
			props.hideTimelineEl();
		}
	}),
	branch((props) => props.droppable, renderComponent(withDroppable))
);

export const Timeline = enhance(TimelinePure);
export default Timeline;
