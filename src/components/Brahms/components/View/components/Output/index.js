import React from 'react';
import {Alert, Collapse, Divider, Card, Col, Row, Button  } from 'antd';
import AcceptPlanButton from '../../../../../../routes/Plan/components/AcceptPlan/components/AcceptPlanButton';
import { withToggleModal, withToggleState } from '../../../../../Modal';
import { AttachmentsList } from '../../../../../FormCustomFields/components/Attachments';
const Panel = Collapse.Panel;

const customPanelStyle = {
    background: '#fffbe6',
    border: '1px solid #ffe58f',
    borderRadius: 4,
    marginBottom: 24,
    // border: 0,
    overflow: 'hidden',
  };

export const BrahmsOutputs = props => {
    const {brahmRules=[]} = props;
    console.log(props, 'BrahmsOutputs');
    if (brahmRules.length === 0) {
        return null;
    }
    return <>
        <Divider>Based on your answers</Divider>
        <Collapse bordered={false} defaultActiveKey={brahmRules.map(rule=>rule.question.id)} style={{marginTop:24}}>
        {brahmRules.map(rule1 => {
            const {rules=[], question} = rule1;
            return <Panel header={question.title} key={question.id} style={customPanelStyle} >
            
            {rules.map(rule => {
                return <div key={rule.id} style={{marginBottom:5}}><BrahmOutputItem rule={rule} /></div>;
            })}
            </Panel>
        })}
    </Collapse></>
}

const BrahmsElementOutputPure = props => {
    const {isToggled=true, toggleState, showToggler=true, ...otherProps} = props;
    return <>
        {/* {showToggler && <div style={{textAlign:'right'}}><Icon type="info-circle" theme={!isToggled && "twoTone"} onClick={toggleState} /></div>} */}
        {(isToggled || !showToggler) && <BrahmsElementOutputBody {...otherProps} />}
    </>
}

export const BrahmsElementOutput = /*withToggleState*/(BrahmsElementOutputPure);

export const BrahmsElementOutputBody = props => {
    // console.log(props, 'propspropsprops');
    const {rules=[]} = props;
    return rules.map(rule => {
        return <div key={rule.id} style={{marginBottom:5}}><BrahmOutputItem rule={rule} /></div>;
    });
}

export const BrahmOutputItem = props => {
    const {rule} = props;
    const {ruleActionType, ruleAction} = rule;
    let output = null;
    switch(ruleActionType) {
        case 'output':
            const {message, attachments=[]} = ruleAction || {};
            let text;
            if (attachments.length > 0) {
                text = <>{message} <AttachmentsList attachments={attachments}  isEditable={false} /> </>;
            } else {
                text = message;
            }
            
            output = <Alert message={text} type="info" />;
            break;
        case 'ap':
            // suggest to assign aps.
            const {plans=[]} = ruleAction || {};

          

            output = plans && plans.map(plan => {
                const {thumb, title} = plan || {};
                const {medium=''} = thumb || {};
           
                // return <div key={title}>  <AcceptPlanButton plan={plan} label={<Card cover={medium} ><Avatar shape="square" src={medium} /> {title}</>} /> </div>;
                return <Col span={8} key={title}> 
                <Card cover={<img src={medium} />} actions={[ <AcceptPlanButton plan={plan} label={<Button type={'orange'}>Get ActionPlan</Button>} />]} >
                <Card.Meta title={title} /> 
                </Card> 
                </Col>;
            });
            output = <Row gutter={16}>{output}</Row>;
            output = <Alert message={'Suggested ActionPlan'} description={output} type="info" />
            break;
    }
    return output;
}