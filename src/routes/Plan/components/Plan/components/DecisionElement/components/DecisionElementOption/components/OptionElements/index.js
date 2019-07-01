import React from 'react';

import {Divider, Tooltip, Modal, Icon} from 'antd';
import { compose, withProps, branch, withHandlers, renderComponent , defaultProps, withState} from 'recompose';

import {SortableContainer, arrayMove} from 'react-sortable-hoc';
import {EmptyList} from "../../../../../../../../../../components/Loading/index";
import {PlanElementsSelectbox} from "../../../../../../../PlanLayout/components/PlanElementsSelectbox/index";
import Option from './option';
import { PlanElementManagerButton } from '../../../../../../../../../../components/Plan/components/Builder/components/Buttons/components/ElementManager';
import { PlanElementsList } from '../../../../../../../../../../components/Plan/components/Body/containers/ElementsList';

const OptionsElements = props => {
    const {elements=[]} = props;
    //parentId={props.id} parentValue={option.value}
    //console.log(elements);
    // check if we have at least one of condition or decision
    //console.log(props);
    return (elements.length > 0 ? <div
        // size="small"
        // split={false}
        // itemLayout="vertical"
        // dataSource={elements}
        // renderItem={(element, i) => <Option  {...props} key={`field-${element.id}`} index={i}  element={element} i={i} collection="decision"  />}
    >
    <PlanElementsList {...props} isInner />
        {/* {elements.map((element, i) => <Option {...props} key={`option-${element.id}`} index={i} element={element} i={i} collection="decision" />)} */}
    </div>: <EmptyResults {...props} />);//}<EmptyList>No Elements {props.isBuilderMode && 'yet.'}</EmptyList>);
}



const EmptyResultsPure = (props) => {
    return <EmptyList noImage>No elements have been added yet.</EmptyList>;
}


const PlanElementAddLine = (props) => {
    // console.log(props);
    const {option, parentId, parentValue} = props;
    const {label} = option || {};
    return <Divider className="element-actions">
        <PlanElementManagerButton {...props} label={'Add Element to '+label} mode="decision" shape={'round'}  parentId={parentId} parentValue={parentValue} />
    </Divider>;
}

// const PlanElementAddLine = compose(
//     withState('modalAdd', 'setModal', false),
//     withHandlers({
//         openAddElement: props => () => {
//             props.setModal(true);
//         },
//         openHideElement: props => () => {
//             props.setModal(false);
//         }
//     }),
// )(PlanElementAddLinePure);

const EmptyResults = compose(
    branch(props => props.isBuilderMode === true, renderComponent(PlanElementAddLine))
)(EmptyResultsPure);

const enhance = compose(
    // withProps(props => {
    //     console.log(props);
    // }),
    // withHandlers({
    //     updateOrder: props => elements => {
    //         //const elements = props.elements;
    //         const ids = elements.map(element => element.id);
    //         // u
    //         //console.log(props);
    //         //props.setIsReorder(true);
    //         props.updateElementsOrder(ids, elements);
    //
    //     }
    // }),
    withHandlers({
        onSortEnd: props => ({oldIndex, newIndex}) => {
            const newElements = arrayMove(props.elements, oldIndex, newIndex);
            //console.log(props.elements);
            console.log(newElements);
            //props.setElements(newElements);
            //props.updateOrder(newElements);
        }
    }),
    branch(props => props.isBuilderMode, SortableContainer),
);

export default enhance(OptionsElements);