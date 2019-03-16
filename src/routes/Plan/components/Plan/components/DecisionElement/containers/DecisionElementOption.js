import React from 'react';
import { graphql } from 'react-apollo';
import DecisionElementOption from '../components/DecisionElementOption';
import {PLAN_ELEMENT_CHILDREN_QUERY} from "../../../../PlanLayout/components/PlanElement/containers/queries";
import { compose, branch, withState, withProps, withHandlers } from 'recompose';
import { withSpinnerWhileLoading } from '../../../../../../Modal/components';
import { DragSource } from 'react-dnd';

// 1- add queries:
const withQuery = graphql(
    PLAN_ELEMENT_CHILDREN_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                id: ownProps.id,
                planId: ownProps.plan.id,
                elementValue: ownProps.option.id
            },
            //fetchPolicy: 'network_only'
        }),
        props: ({  data }) => {
            const planElement = data.planElement || {};
            const {childrenElements=[]} = planElement || {};

            return {
                loading: data.loading,
                elements: childrenElements,
            }
        },
    }
);


const draggableHoc = (ComponentBeingWrapped) => {

    function Layout(props) {
        const {connectDragSource} = props;//isDraggable, preventCardDraggable, isDragging,
        return connectDragSource(<div><ComponentBeingWrapped {...props} /></div>);
    }

    return Layout
}

const boxSource = {
    beginDrag(props) {
        //console.log(props);
        return {
            //element: props.element,
            elements: props.elements,
        }
    },

    endDrag(props, monitor) {
        const item = monitor.getItem()
        const dropResult = monitor.getDropResult();
        //console.log(item);
        if (dropResult) {
            props.onDrop(item);
        }
    },
    //canDrag(props, monitor) {
    //console.log(props);
    //return props.element.type !== 'decision' && props.element.type !== 'condition';
    //}
}
const PlanElementDraggableHOC = DragSource('box', boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}));
 


const addChildEnhancement = compose(
    withState('openAddOption', 'setAddOption', false),
    withHandlers({
        toggleAdd: props => () => {
            props.setAddOption(!props.openAddOption);
        }
    })
);

const enhance = compose(
    withQuery,
    withSpinnerWhileLoading,
    withProps(props => {
        const {elements=[]} = props;
        const preventDraggable = elements.filter(element => element.type==='decision' || element.type==='condition');
        const preventCardDraggable = elements.length === 0 || preventDraggable.length > 0;
        return {preventCardDraggable};
    }),
    withHandlers({
        onSortEnd: props => (value) => {
            console.log(value);
        }
    }),
    // drag the card if we don't have decision or condition inside
    branch(props => props.isDraggable && !props.preventCardDraggable, PlanElementDraggableHOC),
    branch(props => props.isDraggable && !props.preventCardDraggable, draggableHoc),
    branch(props => props.isBuilderMode, addChildEnhancement),
);

export default enhance(DecisionElementOption);





