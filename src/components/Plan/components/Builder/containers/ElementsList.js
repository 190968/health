import {compose, withHandlers, withProps, withStateHandlers, defaultProps} from 'recompose';
import {SortableContainer } from 'react-sortable-hoc';
import {message} from 'antd';
import arrayMove from 'array-move';
import { withUpdatePlanElementsOrderMutation } from '../mutations';

export const PlanElementsListBuilderEnhancer = compose(
    // withStateHandlers(props => {
    //     const {elements} = props;
    //     return elements;
    // }, {
    //     updateElements: (state, props) => elements => {
    //         // const elements = props.elements;
    //         return {
    //             elements
    //         }
    //     }
    // }),
    withUpdatePlanElementsOrderMutation,
    
    withHandlers({
        onSortEnd: props => ({oldIndex, newIndex}) => {
            console.log('SORT END')
            const elements = arrayMove(props.elements, oldIndex, newIndex);

            const ids = elements.map(element => element.id);
            const hide = message.loading('Saving...');
            props.updateElementsOrder(ids, elements).then(() => {
                hide();
                //props.updateElements(elements);
            });
            
            // props.updateOrder(elements);
        }
    }),
    // props for sorting
    withProps(props => {
        // console.log(props);
        return {
            useDragHandle: true,
            lockAxis: 'y',
            hideSortableGhost:false,
            // onSortEnd: props.onSortEnd,
            lockToContainerEdges: true,
            helperClass: 'sorting-now'
            // useWindowAsScrollContainer: true
        }
    }),
    SortableContainer
);

// const enhance = compose(
//     // branch(props => props.isBuilderMode, PlanElementsListBuilderEnhancer)
// );
// export const PlanElementsList = enhance(List);









// const EmptyResultsPure = ({plan, isPreviewMode}) => {
//     if (isPreviewMode) {
//         return 'No elements have been added yet';
//     }
//     return <>{/*<div>No elements have been added yet</div>*/} <PlanElementManagerButton plan={plan} mode={'pathway'} label={'Add First Element'} /></>;
// }


// // const PlanElementAddLinePure = (props) => {
// //    // console.log(props);
// //     return <Divider className="element-actions">
// //         {props.modalAdd && <Modal title="Select Element" visible={true} footer={false} onCancel={props.openHideElement}><PlanElementsSelectbox mode="pathway" plan={props.plan}/></Modal>}
// //         <Tooltip title="Add Element" ><a  onClick={props.openAddElement}><Icon type="plus-circle-o" style={{cursor:'pointer'}} /> Add First Element</a></Tooltip>
// //     </Divider>;
// // }

// // const PlanElementAddLine = compose(
// //     withToggleModal
// // )(PlanElementAddLinePure);

// // const EmptyResults = compose(
// //     branch(props => props.isBuilderMode === true, renderComponent(PlanElementAddLine))
// // )(EmptyResultsPure);


// /**
//  * Enhance Plan element
//  */
// const PlanElementEnhanced = compose(
//     branch(props => props.isBuilderMode, renderComponent(PlanElementBuilderView))
// )(PlanElementListItem);


// /**
//  * Upading the order. IDK why it doenst work if we import from container
//  */
// const UpdateElementsOrder = gql`
//     mutation updatePlanElementsOrder($planId: UID!, $mode: String!, $ids: [UID]! $lessonId: UID, ) {
//         updatePlanElementsOrder(planId:$planId, mode: $mode, ids: $ids, id:$lessonId)
//     }
// `;

// const pathwayFragment =  gql`
//    fragment PathwayElements on Pathway {
//         id
//         elements {
//             ...PlanElement,
//         }
//    }
//     ${PlanElementPureFragment}
//  `;
// const lessonFragment =  gql`
//    fragment PlanLessonElements on PlanBodyLesson {
//         id
//         elements {
//             ...PlanElement,
//         }
//    }
//     ${PlanElementPureFragment}
//  `;
// const sectionFragment =  gql`
//    fragment PlanActivityElements on PlanBodyActivity {
//         id
//         elements {
//             ...PlanElement,
//         }
//    }
//     ${PlanElementPureFragment}
//  `;

// const introFragment =  gql`
//    fragment PlanIntroElements on Plan {
//         id
//         intro {
//             ...PlanElement,
//         }
//    }
//     ${PlanElementPureFragment}
//  `;






// /**
//  * Enhance Body
//  */
// const builderEnhance = compose(
//     // withState('elements2', 'setElements', null),
//     withProps(props => {
//         let propsUpdated = {};
//         if (props.isBuilderMode && !props.isPreviewMode) {
//             propsUpdated = {
//                 useDragHandle: true,
//                 lockAxis: 'y',
//                 onSortEnd: props.onSortEnd,
//                 useWindowAsScrollContainer: true
//             }
//         }


//         const {elements2=null} = props;
//         const {elements=[]} = props;

//         propsUpdated.elements = elements2 ? elements2 : elements;
        
//         return propsUpdated;
//     }),
    
//     branch(props => props.isBuilderMode, withUpdateOrderMutation),
//     withHandlers({
//         updateOrder: props => elements => {
//             //const elements = props.elements;
//             const ids = elements.map(element => element.id);
//             props.updateElementsOrder(ids, elements);

//         }
//     }),
//     withHandlers({
//         onSortEnd: props => ({oldIndex, newIndex}) => {
//             const newElements = arrayMove(props.elements, oldIndex, newIndex);
//             props.updateOrder(newElements);
//         }
//     }),

//     branch(props => props.isBuilderMode, SortableContainer)
// );
// const enhance = compose(
//     withSpinnerWhileLoading,
//     branch(props => props.isBuilderMode, builderEnhance)
// )


// export default enhance(PathwayBody);