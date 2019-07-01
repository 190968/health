import React from 'react'
import {Card, Affix, message, Modal, Divider, Tooltip, Icon} from 'antd';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {PlanElement} from '../../containers/Element';
import { ListWithMessage } from '../../../../../UI/List';
import { PlanElementManagerButton } from '../../../Builder/components/Buttons/components/ElementManager';
import PlanbuilderElementSelect from '../../../Builder/components/SelectElementType/inline';
import './index.less';
import {
    SortableContainer,
    SortableElement,
    SortableHandle,
  } from 'react-sortable-hoc';

// import { PlanElementManagerButton } from '../../../../../../routes/Manager/components/Planbuilder/components/Buttons/components/PlanElementManager';
// // import {EmptyList} from "../../../../../../components/Loading/index";
// import {PlanElementListItem} from '../../containers/PlanElement';
// import {branch, compose, withHandlers, withProps, withState, renderComponent} from 'recompose';
// import {arrayMove, SortableContainer, SortableElement,} from 'react-sortable-hoc';
// import {PlanElementPureFragment} from "../../../Plan/fragments";
// import {withSpinnerWhileLoading} from "../../../../../Modal/components/index";
// // import { withToggleModal } from '../../../../../../components/Modal';
// import { ListWithMessage } from '../../../../../../components/UI/List';
// import { PlanElementManagerButton } from '../../../../../Manager/components/Planbuilder/components/Buttons/components/PlanElementManager';
// import { PlanElementBuilderView } from '../../../../../../components/Plan/components/Builder/containers/ElementView';
// const DragHandle = SortableHandle(() => <span>::</span>);
// const Sortableelement = SortableElement(props => {
//     return <li>
//     <DragHandle />
//     {props.value}
//   </li>
// });
// const SortableExample = (props => {
//     const {elements} = props;
//     return <ul>{elements.map((e, index) => <Sortableelement key={`item-${index}`} index={index} value={'item'+e.id} />)}</ul>

// });
const PlanElementsList = (props) => {
    const {elements=[], isInner=false, isBuilderMode, plan, updateSkippedElements, updateBrahmRules, brahmRules, isPreviewMode, date, ...otherProps} = props;
    // console.log(props, 'propspropspropsprops');
    const {mode} = otherProps;
    const listOfElements = <ListWithMessage
            emptyMessage={<EmptyResultsPure plan={plan} isBuilderMode={isBuilderMode} isPreviewMode={isPreviewMode} mode={mode} />}
            noImage
            itemLayout="vertical"
            className={"plan-elements plan-elements-type-"+mode}
            split={false}
            dataSource={elements}
            renderItem={(element, i) => <PlanElement 
                {...otherProps}
                key={'item' + element.id} 
                i={i}
                plan={plan} 
                element={element} 
                elements={elements}
                updateSkippedElements={updateSkippedElements}
                date={date}
                // isDraggable={isDraggable}
                isPreviewMode={isPreviewMode} 
                isBuilderMode={isBuilderMode}
                brahmRules={brahmRules}
                updateBrahmRules={updateBrahmRules}
                />
        }
        />;
    if (isInner) {
        // if (elements
        return listOfElements;
    }
    return (<div>
     {(isBuilderMode && !isPreviewMode) && <Affix>
        <PlanbuilderElementSelect {...props} />
    </Affix>}
    <Card bordered={false} className={'plan-elements-wrap'}>
    {listOfElements}
    </Card></div>)
}

export default PlanElementsList;


const EmptyResultsPure = ({plan, isPreviewMode, isBuilderMode, mode}) => {
    if (isBuilderMode) {
        if (isPreviewMode) {
            return 'No elements have been added yet';
        }
        const {type} = plan;
        switch(type) {
            case 'pathway':
                return 'To Begin building your Pathway, select from one of the elements above.';
        }
        switch(mode) {
            case 'lesson':
                return 'To Begin building your Lesson, select from one of the elements above.';
            case 'section':
                return 'To Begin building your Activity, select from one of the elements above.';
            case 'introduction':
                return 'To Begin building your Introduction, select from one of the elements above.';
        }
        
        return <>{/*<div>No elements have been added yet</div>*/} <PlanElementManagerButton plan={plan} buttonType={'primary'} mode={'pathway'} shape={'round'} label={'Add First Element'} /></>;
    } else {
        return null;
    }
}

