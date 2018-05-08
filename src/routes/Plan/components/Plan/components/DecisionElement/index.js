import React from 'react';
import {Divider, Card} from 'antd';


import {branch, compose} from 'recompose';
import DecisionElementOption from './containers/DecisionElementOption';
import './index.less';



const DecisionElement = (props) => {
    const {id, item, planId, isDraggable, onDrop, isPreviewMode, isBuilderMode, mode} = props;
    const {options} = item;
    const blocksTotal = options.length;

    return options.map((option, i) => {

        return <React.Fragment key={i}>
                <DecisionElementOption id={id} i={i} item={item}  planId={planId} isDraggable={isDraggable} onDrop={onDrop} isPreviewMode={isPreviewMode} isBuilderMode={isBuilderMode} mode={mode} option={option} />
            {(blocksTotal > 1 && blocksTotal > i+1) && <Divider className="decision-divider" orientation="left">OR</Divider>}
        </React.Fragment>
    });
}



export default DecisionElement;