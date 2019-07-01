import React from 'react';
import {Divider, Modal, Icon} from 'antd';
import {withHandlers, compose} from 'recompose';
import DecisionElementOption from './containers/DecisionElementOption';
import './index.less';



const DecisionElement = (props) => {
    // console.log(props, 'decision');
    const {id, item, plan, isDraggable, onDrop, isPreviewMode, element, isBuilderMode, mode, ...otherProps} = props;
    // const {} = otherProps;
    const {options} = item;
    const blocksTotal = options.length;

    return options.map((option, i) => {

        return <React.Fragment key={i}>
                <DecisionElementOption {...otherProps} id={id} i={i} item={item}  plan={plan} isDraggable={isDraggable} onDrop={onDrop} isPreviewMode={isPreviewMode} isBuilderMode={isBuilderMode} mode={mode} option={option} parentElement={element} elementValue={option.id} />
            {(blocksTotal > 1 && blocksTotal > i+1) && <Divider className="decision-divider" orientation="left">OR</Divider>}
        </React.Fragment>
    });
}

export default DecisionElement;


export const FootNoteButtonPure = ({showInfo}) => {
    return <React.Fragment>
        <Icon type={'share-alt'} onClick={showInfo} />
    </React.Fragment>;
}

const enhance = compose(
    withHandlers({
        showInfo: props => () => {
            Modal.info({
                title: 'Additional Info',
                content: <span dangerouslySetInnerHTML={{__html: props.footnote}}></span>,
                //onOk() {},
            });
        }
    })
);
export const FootNoteButton = enhance(FootNoteButtonPure);