import React from 'react'
import {Card, Button} from 'antd';
import {compose, withProps, withHandlers, withState} from 'recompose';
import {withModal} from "../../../../../../components/Modal/index";
import PlanElementChildrenList from "../../../PlanLayout/components/PlanElement/containers/PlanElementChildrenList";

const AliasModal = compose(
    withProps(props => {
       return {
           modalTitle: 'View Elements',
           modalFooter: 'close',
       }
    }),
    withModal
)(PlanElementChildrenList);

export const AliasElement = props => {
    const {element={}, toggleChildren, viewModal = false, onDrop, planId, isDraggable, isBuilderMode, mode} = props;
    const {itemInfo={}} = element;
    let {btnLabel='Show'} = itemInfo;
    return <React.Fragment>
        {viewModal && <AliasModal onHide={toggleChildren} elementId={element.id} onDrop={onDrop} planId={planId} isDraggable={isDraggable} isPreviewMode={true} isBuilderMode={isBuilderMode} mode={mode} /*elementValue={props.elementValue} */ />}
        <Button type="primary" onClick={toggleChildren}>{btnLabel}</Button>
    </React.Fragment>
}

const enhance = compose(
    withState('viewModal', 'setViewModal'),
    withHandlers({
        toggleChildren: props => value => {
            console.log(props);
            props.setViewModal(!props.viewModal);
            //props.showAlias(props.element.id);
        }
    })
);

export default enhance(AliasElement);