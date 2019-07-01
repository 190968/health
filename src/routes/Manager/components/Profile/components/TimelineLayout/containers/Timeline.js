import TimelinePure from '../components/Timeline';
import React from 'react';
import { withTimelineQuery } from '../queries';
import { compose, withHandlers, withStateHandlers, defaultProps, branch, renderComponent } from 'recompose';
import { DropTarget } from 'react-dnd';
import { withSpinnerWhileLoading } from '../../../../../../../components/Modal';


/** START DROPPABLE */
const droppableTimeline = props => {
	const {connectDropTarget} = props;
	// console.log(props, 'dddrrrrop');
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
    branch(({useQuery=true}) => useQuery, withTimelineQuery),
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
			if (props.refetchTimeline) {
				props.refetchTimeline();
			}
			
			//return {openAddElement:false, elementType:''}
			props.hideTimelineEl();
		}
	}),
	branch((props) => props.droppable, renderComponent(withDroppable))
);

export const Timeline = enhance(TimelinePure);
export default Timeline;
