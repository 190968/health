import React from 'react';
import {List} from 'antd';
import {EmptyList} from "../../../../../../../../components/Loading/index";
import {PathwayBodyElement} from "./containers/PathwayBodyElement";
import {compose, withState, withHandlers, withProps} from 'recompose';
import TimelineElementModal from '../../../TimelineLayout/components/Timeline/containers/TimelineElementModal';
import { withPlanElementSkippedElements, filterSkippedPlanElements } from '../../../../../../../../components/Plan/utils';
import { withPlanElementsSelectorEnhancer, PlanElementsList } from '../../../../../../../../components/Plan/components/Body/containers/ElementsList';
import { withSpinnerWhileLoading } from '../../../../../../../../components/Modal';



const TimelineElementModalSingle = props => {
    //console.log(props);
    return <TimelineElementModal {...props} onHide={() => props.removeElement(props.element.id)}/>;

}

const TimelineElementModalEnhanced = compose(
    withProps(props => {
        console.log(props);
        return props;
    }),
    // withState('elements', 'setElements', (props => {
    //     const {elements=[]} = props;
    //     console.log(props,'ELEMENRS');
    //     return elements;
    // })),
    withHandlers({
        removeElement: props => value => {
            const elements = props.elements.filter(element => element.id !== value);
            //console.log(props, 'Remove element');
            //console.log(elements, 'Remove element');
            props.setTimelineElementToAdd({elements});
            if (elements.length === 0) {
                props.onHide();
            }
        }
    })
)(props => {
    const {elements = []} = props;
    // if we have multiple elements - we need to show tabs for every element
    // console.log(props, 'propsprops');
    if (elements.length > 0) {
        return elements.map(element => <TimelineElementModalSingle {...props} element={element}/>);
    }
    return <TimelineElementModal {...props} />;
});






const PathwayBody = props => {
    const {user, pathway = {}, timelineElementToAdd: element, onHide, onDrop, currentInOrder, i, setTimelineElementToAdd, refetchTimeline, ...otherProps} = props;
    const {elements } = pathway;

    //prepareSkipp//
    const {skippedElementsByRef} = otherProps;

    const filteredElements = filterSkippedPlanElements(elements, skippedElementsByRef);
    // console.log(filteredElements, 'filteredElementsfilteredElements');
    // filterSkippedPlanElements
    console.log(element, 'elementTOAAAADDDD');
    return (<React.Fragment>
        {props.openTimelineModal && <TimelineElementModalEnhanced user={user} setTimelineElementToAdd={setTimelineElementToAdd} pathway={pathway} refetchTimeline={refetchTimeline} {...element} onHide={onHide}/>}
        {filteredElements ?

            <PlanElementsList {...props} plan={{...pathway, type: 'pathway'}} mode="pathway" elements={filteredElements} isDraggable />
                // <List
                //     size="small"
                //     itemLayout="vertical"
                //     className={'plan-elements'}
                //     split={false}
                //     dataSource={filteredElements}
                //     renderItem={(item, i) => {
                //         return  <PathwayBodyElement key={item.id} {...otherProps} plan={{...pathway, type: 'pathway'}} i={i} currentInOrder={currentInOrder} element={item} elements={filteredElements} user={user}
                //                                 onDrop={onDrop}/>
                //         // </List.Item>
                //     }}
                // />
            : <EmptyList>No Pathway content</EmptyList>}
    </React.Fragment>)
}


const enhance = compose(
    withSpinnerWhileLoading,
    withState('openTimelineModal', 'setOpenTimelineModal', false),
    withState('timelineElementToAdd', 'setTimelineElementToAdd', null),
    withHandlers({
        onDrop: props => (element) => {
            //  console.log(element, 'Dropped element');
            props.setOpenTimelineModal(true);
            props.setTimelineElementToAdd(element);

            let currentInOrder = parseInt(props.currentInOrder);
            props.setCurrentInOrder(currentInOrder+1);
            // save the element
            
        },
        onHide: props => () => {
            props.setOpenTimelineModal(false);
            props.setTimelineElementToAdd(null);
            if (props.setOpenElement) {
                props.setOpenElement(false);
            }
        }
    }),
    // withProps(props => {
    //     const {loading, openElement = false, openTimelineModal, timelineElementToAdd} = props;
    //     //console.log(props);
    //     if (!loading && openElement && !openTimelineModal && timelineElementToAdd === null) {
    //         const {currentInOrder, pathway: {elements = []}} = props;
    //         //console.log(props);
    //         //console.log(elements);
    //         // find needed element
    //         const currentElements = elements.filter((element, i) => i === currentInOrder);
    //         //let element = null;
    //         if (currentElements.length > 0) {
    //             //element = .itemInfo;
    //             //console.log(currentElements[0]);
    //             //props.onDrop({element: currentElements[0]});

    //             //props.setOpenElement(false);
    //         }
    //         /* console.log(element);
    //          return {
    //              element
    //          }*/
    //     }
    // }),
    withPlanElementSkippedElements,
    // withPlanElementsSelectorEnhancer
    //branch(props => props.openElement, renderComponent(TimelineElementModal))
)
//       openElement, setOpenElement
//     <TimelineElementModal userId={userId} pathway={pathway} {...element} onHide={this.onHide} />
// }

export default enhance(PathwayBody);