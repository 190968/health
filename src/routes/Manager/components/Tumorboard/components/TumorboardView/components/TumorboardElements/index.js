import React from 'react';
import {Card, Badge, Tooltip} from 'antd';
import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';
import {defaultProps, branch,compose, withState, withHandlers} from 'recompose';
import {TimelineElementView} from "../../../../../Profile/components/Pathway/components/Timeline/components/TimelineElement/index";
import {CardComments} from "../../../../../../../../components/Card/components/CardComments/index";

const DragHandle = SortableHandle(() => <Tooltip title="Sort"><span className="sorter-handler"></span></Tooltip>);


const TumorboardElementCardPure = props => {
    const {element, i, userId, editable} = props;
    const {id} = element;
    const {body, color, activityText, image, icon, progress, title} = TimelineElementView(element);
    return <Card title={<React.Fragment><Badge count={i+1} style={{ backgroundColor: '#52c41a' }}  /> {title}</React.Fragment>}
                 key={i}
    extra={(editable ? <DragHandle /> : undefined)}
    >
        {activityText}
        <CardComments id={id} type="tumorboard_el" title="Comments" userId={userId} /></Card>;
}

const enhanceItem = compose(
    branch(props => props.editable, SortableElement)
);

const TumorboardElementCard = enhanceItem(TumorboardElementCardPure);






const TumorboardElementsPure = props => {
    const {elements=[], userId, editable} = props;
    return <div>{elements.map((element, i) => {
        return <TumorboardElementCard element={element} key={`item-${i}`} index={i} i={i} userId={userId} editable={editable} />
    })}</div>;
};

const enhance = compose(
    defaultProps({
        useDragHandle:true
    }),
    withState('elements', 'setElements', props => props.elements),
    withHandlers({
        onSortEnd: props => ({oldIndex, newIndex}) => {
            props.setElements(arrayMove(props.elements, oldIndex, newIndex));
        }
    }),
    SortableContainer
);

export const TumorboardElements = enhance(TumorboardElementsPure);