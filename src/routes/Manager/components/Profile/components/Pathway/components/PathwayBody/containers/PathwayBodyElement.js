import PathwayBodyElementPure from '../components/PathwayBodyElement';
import { DragSource } from 'react-dnd';

const PATHWAY_DRAGGABLE_ELEMENTS = [
	'checklist',
	'clinical_note',
	'treatment',
	'link',
	'ap',
	'media',
]
export const pathwayElementCanBeDraggable = (element) => {
	const {type} = element || {};
	return PATHWAY_DRAGGABLE_ELEMENTS.includes(type);
	return element.type !== 'decision' && element.type !== 'condition';
};

const boxSource = {
	beginDrag(props) {
		return {
			element: props.element
		};
	},

	endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		if (dropResult) {
			props.onDrop(item);
			//alert(`You dropped ${item.element.type} into ${dropResult.name}!`) // eslint-disable-line no-alert
		}
	},
	canDrag(props, monitor) {
		return pathwayElementCanBeDraggable(props.element);
	}
};

const withDraggable = DragSource('timelineElement', boxSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}));

export const PathwayBodyElement = withDraggable(PathwayBodyElementPure);
export default PathwayBodyElement;
