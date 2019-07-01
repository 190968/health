import React from 'react'
import {List, Divider} from 'antd';
import PlanElementChildrenElement from './containers/PlanElementChildrenElement';
import {EmptyList} from "../../../../../../../../components/Loading/index";
import { PlanElementManagerButton } from '../../../../../../../../components/Plan/components/Builder/components/Buttons/components/ElementManager';
import { PlanElementsList } from '../../../../../../../../components/Plan/components/Body/containers/ElementsList';



const PlanElementChildrenList = (props) => {
    const {loading, elements, isBuilderMode, isPreviewMode} = props;
    // show loading if loading
    if (loading) {
        if (isBuilderMode && !isPreviewMode) {
            return  <EmptyList noImage>{loading ? 'Loading...' :  ''}</EmptyList>;
        }
        return null;
    }
    // show add button if it's in the builder and not the preview
    if (!loading && elements.length === 0) {
        if (isBuilderMode && !isPreviewMode) {
            return <Divider><AddChildrenButton {...props} /></Divider>;
        }
        return null;
    }
    // console.log('Childrenlist');
    return <PlanElementsList {...props} isInner />;
    // const {elementId, elementValue, elements=[], isDraggable, onDrop, isBuilderMode, isPreviewMode, notClickable=false, plan, mode, loading, ...otherProps} = props;
    // return (<React.Fragment>

    //     {elements.length > 0 ?
    //         <List
    //             size="large"
    //             itemLayout="vertical"
    //             split={false}
    //             dataSource={elements}
    //             renderItem={(item, i) => {
    //                 return <List.Item
    //                     id={'field' + item.id}
    //                     key={item.id}>
    //                     <PlanElementChildrenElement {...otherProps} i={i} isDraggable={isDraggable} onDrop={onDrop} element={item} plan={plan} mode={mode} isBuilderMode={isBuilderMode}
    //                                                 parentId={elementId} parentValue={elementValue}
    //                                                  isPreviewMode={isPreviewMode}
    //                                                  notClickable={notClickable}
    //                     />

    //                 </List.Item>
    //             }}
    //         />
    //         : <EmptyList noImage>{loading ? 'Loading...' :  ''}</EmptyList>
    //     }

    //     {(!loading && elements.length === 0 && isBuilderMode && !isPreviewMode) && <Divider><AddChildrenButton {...props} /></Divider>}
    // </React.Fragment>)
}

export default PlanElementChildrenList;



const AddChildrenButton = props => {
    const {elementId, elementValue, elements=[], isDraggable, onDrop, isBuilderMode, isPreviewMode, plan, mode, loading} = props;
    return <PlanElementManagerButton {...props} parentId={elementId} parentValue={elementValue} />
}
 
