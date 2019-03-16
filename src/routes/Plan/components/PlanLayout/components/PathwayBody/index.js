import React from 'react'
import {Card, List, message, Modal, Divider, Tooltip, Icon} from 'antd';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
// import {EmptyList} from "../../../../../../components/Loading/index";
import {PlanElementListItem} from '../../containers/PlanElement';
import {branch, compose, withHandlers, withProps, withState, renderComponent} from 'recompose';
import {arrayMove, SortableContainer, SortableElement,} from 'react-sortable-hoc';
import {PlanElementPureFragment} from "../../../Plan/fragments";
import {withSpinnerWhileLoading} from "../../../../../Modal/components/index";
// import { withToggleModal } from '../../../../../../components/Modal';
import { ListWithMessage } from '../../../../../../components/UI/List';
import { PlanElementManagerButton } from '../../../../../Manager/components/Planbuilder/components/Buttons/components/PlanElementManager';
// import { PlanElementBuilderView } from '../../../../../../components/Plan/components/Builder/containers/ElementView';
import { PlanElementsList } from '../../../../../../components/Plan/components/Body/containers/ElementsList';
import { LoadingPageSpinner } from '../../../../../../components/Loading';
import { filterSkippedPlanElements } from '../../../../../../components/Plan/utils';


const PathwayBody = (props) => {
    const {elements=[], loading, ...otherProps} = props;
    
    if (loading) {
        return <LoadingPageSpinner />;
    }
    const {skippedElementsByRef} = otherProps;

    const filteredElements = filterSkippedPlanElements(elements, skippedElementsByRef);
    return <PlanElementsList {...props} elements={filteredElements} />
    // return (<Card bordered={false}>
    // <ListWithMessage
    //     emptyMessage={<EmptyResultsPure plan={plan} isPreviewMode={isPreviewMode} />}
    //     itemLayout="vertical"
    //     className="plan-elements"
    //     /*itemLayout="horizontal"*/
    //     split={false}
    //     dataSource={elements}
    //     renderItem={(item, i) => {
    //         return <PlanElementEnhanced 
    //         key={'item' + item.id} 
    //         index={i} 
    //         collection="pathway" 
    //         mode="pathway" 
    //         i={i} 
    //         plan={plan} 
    //         element={item} 
    //         date={date}
    //         isDraggable={isDraggable}
    //         isPreviewMode={isPreviewMode} 
    //         isBuilderMode={isBuilderMode}/>
    //     }}
    // />
    // </Card>)
}

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
// // const PlanElementEnhanced = compose(
// //     branch(props => props.isBuilderMode, renderComponent(PlanElementBuilderView))
// // )(PlanElementListItem);


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




// export const withUpdateOrderMutation = graphql(UpdateElementsOrder, {
//     props: ({ownProps, mutate}) => ({
//         updateElementsOrder: (ids, elements) => {
//             //console.log(ownProps);
//             const {item = {}} = ownProps;
//             const {id=null} = item;
//             return mutate({
//                 variables: {planId: ownProps.plan.id, mode: ownProps.mode, ids: ids, id:id},
//                 optimisticResponse: {
//                     __typename: "Mutation",
//                     updatePlanElementsOrder: {
//                         updatePlanElementsOrder: true,
//                     }
//                 },
//                 update: (client, { data: { planElementReport } }) => {
//                     const {mode, plan} = ownProps;
//                     // console.log(ownProps);
//                     if (mode === 'pathway') {
//                         // if it's pathway - remov
//                         let pathway = client.readFragment({
//                             id: 'Pathway:'+plan.id, // `id` is any id that could be returned by `dataIdFromObject`.
//                             fragment: pathwayFragment,
//                             fragmentName: "PathwayElements",
//                         });


//                         client.writeFragment({
//                             id: 'Pathway:'+plan.id, // `id` is any id that could be returned by `dataIdFromObject`.
//                             fragment: pathwayFragment,
//                             fragmentName: "PathwayElements",
//                             data: {
//                                 ...pathway,
//                                 elements: elements,
//                                 __typename:'Pathway'
//                             },
//                         });
//                     } else if (mode === 'lesson') {
//                         const lessonId = ownProps.item.id;
//                         // if it's pathway - remov
//                         let pathway = client.readFragment({
//                             id: 'PlanBodyLesson:'+lessonId, // `id` is any id that could be returned by `dataIdFromObject`.
//                             fragment: lessonFragment,
//                             fragmentName: "PlanLessonElements",
//                         });


//                         client.writeFragment({
//                             id: 'PlanBodyLesson:'+lessonId, // `id` is any id that could be returned by `dataIdFromObject`.
//                             fragment: lessonFragment,
//                             fragmentName: "PlanLessonElements",
//                             data: {
//                                 ...pathway,
//                                 elements: elements,
//                                 __typename:'PlanBodyLesson'
//                             },
//                         });
//                     } else if (mode === 'section') {
//                         const sectionId = ownProps.item.id;
//                         // if it's pathway - remov
//                         let pathway = client.readFragment({
//                             id: 'PlanBodyActivity:'+sectionId, // `id` is any id that could be returned by `dataIdFromObject`.
//                             fragment: sectionFragment,
//                             fragmentName: "PlanActivityElements",
//                         });


//                         client.writeFragment({
//                             id: 'PlanBodyActivity:'+sectionId, // `id` is any id that could be returned by `dataIdFromObject`.
//                             fragment: sectionFragment,
//                             fragmentName: "PlanActivityElements",
//                             data: {
//                                 ...pathway,
//                                 elements: elements,
//                                 __typename:'PlanBodyActivity'
//                             },
//                         });
//                     } else if (mode == 'introduction') {
//                             console.log(elements);
//                             // if it's pathway - remov
//                             let pathway = client.readFragment({
//                                 id: 'Plan:'+plan.id, // `id` is any id that could be returned by `dataIdFromObject`.
//                                 fragment: introFragment,
//                                 fragmentName: "PlanIntroElements",
//                             });
//                             console.log(pathway);


//                             client.writeFragment({
//                                 id: 'Plan:'+plan.id, // `id` is any id that could be returned by `dataIdFromObject`.
//                                 fragment: introFragment,
//                                 fragmentName: "PlanIntroElements",
//                                 data: {
//                                     ...pathway,
//                                     intro: elements,
//                                     __typename:'Plan'
//                                 },
//                             });
//                     }
//                 },
//             }).then(() => {
//                 message.success('Updated');
//             })
//         },

//     }),
// });


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


export default PathwayBody;
