import React from 'react';
import PathwayElement from './containers/PathwayElement';
import './index.less';
import { pathwayElementCanBeDraggable } from '../../containers/PathwayBodyElement';


 const PathwayBodyElement  = props => {
        const {i, element, plan, onDrop, currentInOrder, user} = props;

        const { isDragging, connectDragSource } = props
        const opacity = isDragging ? 0.4 : 1

        if (pathwayElementCanBeDraggable(element)) {
            return connectDragSource(<div className={"pathway-el-dnd"} style={{opacity}}><PathwayElement i={i} isDraggable onDrop={onDrop} currentInOrder={currentInOrder} element={element} plan={plan} user={user} notClickable /></div>);
        } else {
            return <div className={element.type === 'condition' ? 'red-card-wrap' : {}} ><PathwayElement i={i} isDraggable onDrop={onDrop} currentInOrder={currentInOrder} element={element} plan={plan} user={user} notClickable /></div>;
        }
}

export default PathwayBodyElement;