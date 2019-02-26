import React from 'react';
import {Alert, Collapse, Divider, Card, Col, Row, Icon  } from 'antd';
import AcceptPlanButton from '../../../../../../routes/Plan/components/AcceptPlan/components/AcceptPlanButton';
import { withToggleModal, withToggleState } from '../../../../../Modal';
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
    const {isToggled, toggleState, showToggler=true, ...otherProps} = props;
    return <>
        {showToggler && <div style={{textAlign:'right'}}><Icon type="info-circle" theme={!isToggled && "twoTone"} onClick={toggleState} /></div>}
        {(isToggled || !showToggler) && <BrahmsElementOutputBody {...otherProps} />}
    </>
}

export const BrahmsElementOutput = withToggleState(BrahmsElementOutputPure);

export const BrahmsElementOutputBody = props => {
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
            const {message} = ruleAction || {};
            output = <Alert message={message} type="success" />;
            break;
        case 'ap':
            // suggest to assign aps.
            const {plans=[]} = ruleAction || {};

          

            output = plans && plans.map(plan => {
                const {thumb, title} = plan || {};
                const {medium=''} = thumb || {};
           
                // return <div key={title}>  <AcceptPlanButton plan={plan} label={<Card cover={medium} ><Avatar shape="square" src={medium} /> {title}</>} /> </div>;
                return <Col span={8} key={title}>  
                <AcceptPlanButton plan={plan} label={<Card cover={<img src={medium} />} hoverable>
                <Card.Meta title={title} /> 
                </Card>} /> </Col>;
            });
            output = <Row gutter={16}>{output}</Row>;
            output = <Alert message={'Suggested ActionPlan'} description={output} type="info" />
            break;
    }
    return output;
}