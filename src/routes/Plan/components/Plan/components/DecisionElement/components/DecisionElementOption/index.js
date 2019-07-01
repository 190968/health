import React from 'react'
import {Card, List, Badge, Modal, Icon} from 'antd';
import OptionElements from './components/OptionElements';
import FootnoteView from '../../../../../../../../components/Footnote/components/View';
 
const DecisionElementOptionCard = (props) => {
    const { i, mode, plan, option, isDragging, preventCardDraggable, connectDragSource, isDraggable=false, isBuilderMode = false} = props;
    const {footnote} = option || {};
    return <Card key={option.id} title={<span><span  style={{ lineHeight:'1em', verticalAlign:'text-top' }} ><Badge count={i+1} style={{ backgroundColor: '#52c41a', verticalAlign:'top' }} /></span> {option.label} <FootnoteView footnote={footnote} /></span>}  type="option" >
            <OptionElements {...props} parentId={props.id} parentValue={option.id} lockToContainerEdges lockAxis="y" useDragHandle={false} distance={10} />
            </Card>;
}


export default DecisionElementOptionCard;