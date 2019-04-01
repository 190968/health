import React from 'react'
import {Card, List, Button, Modal, Divider} from 'antd';
import {withState, withHandlers, compose} from 'recompose';
import PlanElementChildrenElement from './containers/PlanElementChildrenElement';
import PlanElement from "../../../../components/PlanElement";
import PlanElementChildrenSelect from './components/PlanElementChildrenSelect';
import {EmptyList} from "../../../../../../../../components/Loading/index";
import { PlanElementManagerButton } from '../../../../../../../../components/Plan/components/Builder/components/Buttons/components/ElementManager';



const PlanElementChildrenList = (props) => {
    //console.log(props);
    const {elementId, elementValue, elements=[], isDraggable, onDrop, isBuilderMode, isPreviewMode, notClickable=false, plan, mode, loading, ...otherProps} = props;
    return (<React.Fragment>

        {elements.length > 0 ?
            <List
                size="large"
                itemLayout="vertical"
                split={false}
                dataSource={elements}
                renderItem={(item, i) => {
                    return <List.Item
                        id={'field' + item.id}
                        key={item.id}>
                        <PlanElementChildrenElement {...otherProps} i={i} isDraggable={isDraggable} onDrop={onDrop} element={item} plan={plan} mode={mode} isBuilderMode={isBuilderMode}
                                                    parentId={elementId} parentValue={elementValue}
                                                     isPreviewMode={isPreviewMode}
                                                     notClickable={notClickable}
                        />

                    </List.Item>
                }}
            />
            : <EmptyList>{loading ? 'Loading...' :  ''}</EmptyList>
        }

        {(!loading && elements.length === 0 && isBuilderMode && !isPreviewMode) && <Divider><AddChildrenButton {...props} /></Divider>}
    </React.Fragment>)
}

export default PlanElementChildrenList;



const AddChildrenButton = props => {
    const {elementId, elementValue, elements=[], isDraggable, onDrop, isBuilderMode, isPreviewMode, plan, mode, loading} = props;
    return <PlanElementManagerButton {...props} parentId={elementId} parentValue={elementValue} />
    //     {props.showModal && <Modal title="Select Element" visible={true} width={850} onOk={props.toggleModal} onCancel={props.toggleModal}>
    //         <PlanElementChildrenSelect mode={mode} plan={plan} parentId={elementId} parentValue={elementValue} onHide={props.hideModal} onElementAdd={props.onElementAdd} />
    //     </Modal>}
    //     <Button onClick={props.toggleModal}>Add First Element</Button>
    // </React.Fragment>
}
 
