import React from 'react';
import {Card, Badge, Tooltip, Icon, message, Checkbox} from 'antd';
import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';
import {defaultProps, branch,compose, withState, withHandlers, lifecycle, withProps} from 'recompose';

import {TimelineElementView} from "../../../../../../../../../TimelineElement";
import {CardComments} from "../../../../../../../../../../../../../../../../../../components/Card/components/CardComments";
import {withSpinnerWhileLoading} from "../../../../../../../../../../../../../../../../../../components/Modal";
import { DragHandle } from '../../../../../../../../../../../../../../../../../../components/FormCustomFields/components/Options';

//import {withUpdateOrderMutation} from "./mutation";


const TumorboardElementCardPure = props => {
    const {element, i=0, userId, editable} = props;
    const {id, notes=''} = element;
    const showComments = false;// !editable && typeof i === 'number';
    const {body, color, activityText, image, icon, progress, title} = TimelineElementView(element);
    return <Card
                title={<React.Fragment><Checkbox /> {i >= 0 && <Badge count={i >= 0 && (i+1)} style={{ backgroundColor: '#52c41a' }}  />} {title}</React.Fragment>}
                key={i}
                extra={(editable ? <DragHandle /> : undefined)}
    >
    
        {activityText}
        {notes !== '' && <div className="ant-card-notes">{notes}</div>}
        {showComments &&  <CardComments id={id} type="tumorboard_el" title="Comments" userId={userId} />}
        </Card>;
}

const enhanceItem = compose(
    branch(props => props.editable, SortableElement)
);

export const TumorboardElementCard = enhanceItem(TumorboardElementCardPure);






const TumorboardElementsPure = props => {
    const {elements=[], userId, editable} = props;
    //onsole.log(elements);
    return elements.map((element, i) => {
        return <TumorboardElementCard element={element} key={`item-${i}`} index={i} i={i} userId={userId} editable={editable} />
    });
};

const enhance = compose(
    withSpinnerWhileLoading,
    defaultProps({
        useDragHandle:true
    }),
    //branch(props => props.editable, withUpdateOrderMutation),
    //withState('elements_sortable', 'setElements', props => props.elements),
    withHandlers({
        onSortEnd: props => ({oldIndex, newIndex}) => {
            //console.log(props);
            const newOrder = arrayMove(props.elements, oldIndex, newIndex);
            props.updateElements(newOrder);
            // save elements order
            // props.updateOrder(newOrder.map(element => element.id)).then(() => {
            //     message.success('Updated');
            // });
        }
    }),
    withProps(props => {
        return {
            //elements:elements_sortable,
            lockAxis:'y',
            lockToContainerEdges:true,
            hideSortableGhost:false,
            draggableTemplate: 'treatmentPlan'
        }
    }),
    SortableContainer,
);

export const TreatmentPlanElements = enhance(TumorboardElementsPure);
