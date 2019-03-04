import React from 'react';
import {List, Collapse, Icon} from 'antd';
import { ListWithMessage } from '../../../../../UI/List';
import { BrahmsRuleManagerButton } from '../Buttons/components/Brahms';
import { BrahmsRuleDeleteButton } from '../Buttons/components/Brahms/delete';
import { branch, renderComponent } from 'recompose';
import { formatAssessmentRuleCondition } from '../Rule';

 
const BrahmsAsField = props => {
    const { value:brahms, loading, onChange, appendRule, ...otherProps} = props; 
    // console.log(props, 'BRAHM AS FIELD');
    return <> 
    <ListWithMessage
        emptyMessage={false}
        itemLayout="horizontal"
        size={'small'}
        bordered
        loading={loading}
        dataSource={brahms}

        renderItem={(rule, i) => {
            const actions = [<BrahmsRuleManagerButton {...otherProps} ruleIndex={i} rule={rule} icon={'edit'} onChange={props.updateRule} />, <BrahmsRuleDeleteButton ruleIndex={i} rule={rule} icon={'delete'} onDelete={props.deleteRule} />];
            
            return <List.Item key={i} 
            actions={actions}
            ><BrahmsRuleManagerItem {...otherProps} rule={rule}  /></List.Item>
        }} 
    />
    <BrahmsRuleManagerButton {...otherProps} onChange={appendRule} />
    </>
}

export default BrahmsAsField;


const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
  };
export const BrahmsRulesView = props => {
    const {rules=[], renderRule, ...otherProps} = props;
    if (!rules || rules.lenght == 0) {
        return null;
    }
    return <Collapse bordered={false} expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}>
    <Collapse.Panel header="Brahms" key="1" style={customPanelStyle} >
        <ListWithMessage
            emptyMessage={false}
            itemLayout="horizontal"
            size={'small'}
            // header={'Brahms'}
            // bordered
            loading={false}
            dataSource={rules}
            renderItem={(rule, i) => {
            return <List.Item key={i} ><BrahmsRuleManagerItem {...otherProps} rule={rule} renderRule={renderRule} /></List.Item>
            }} 
        />
    </Collapse.Panel>
    </Collapse>;
}



// const conditionalRender = (states) =>
//     compose(...states.map(state =>
//         branch(state.when, renderComponent(state.then))
//     ));

    
const BrahmsRuleManagerItem = props => {
    const {renderRule, ...otherProps} = props;
    const {rule, possibleOptions=[], formatGoToElement} = otherProps;

    const isAnswredQuestion = possibleOptions.length > 0;
    if (renderRule) {
        //return renderRule(otherProps);
    }

//     id: "a36"
// ruleAction: {message: "second one", __typename: "BrahmsActionOutput"}
// ruleActionType: "output"
// ruleType: "equal"
// ruleTypeValue: 8117
// ruleValueId: "a8117"

    console.log(props, 'rulerulerulerulerule');
    let {ruleType, ruleValue, ruleValueId, ruleActionType, ruleAction} = rule || {};
    const condition = formatAssessmentRuleCondition(rule);
    console.log(condition, 'condition');
    let string;
    let prefix = condition;
    if (!isAnswredQuestion && ruleValue) {
        prefix += ' '+ruleValue;
    } else if (ruleValueId) {
        const answer = possibleOptions.find(a=>a.id === ruleValueId);
        // console.log(possibleOptions, 'possibleOptions');
        // console.log(ruleValueId, 'ruleValueId');
        // console.log(answer, 'answer');
        const {label} = answer || {};
        prefix = ' '+label;
    }
    switch(ruleActionType) {
        case 'output':
            const {message:messageInit, outputActionInput} = ruleAction || {};
             const {message=messageInit} = outputActionInput || {};
            string = message;
        break;
        case 'ap':
            console.log(ruleAction);
            const {plans=[], apActionInput} = ruleAction || {};
            // const {plans=plansInit} = apActionInput || {};
            if (plans) {
                string = plans.map(p=>p.title);
            }
            //prefix = '';
            ruleActionType = 'ActionPlans';
        break;
        case 'goto':
            const {goToElementId} = ruleAction || {};
            // find
            if (formatGoToElement) {
                string = formatGoToElement(goToElementId);
            } else {
                string = goToElementId;
            }
        break;
    }

    ;

    return <div><strong>{prefix} {ruleActionType}</strong>: {string}</div>
}

// const BrahmsRuleManagerItem = branch(props => {
//     const {renderRule} = props;
//     return renderRule
// },  renderComponent())(BrahmsRuleManagerItemPure);