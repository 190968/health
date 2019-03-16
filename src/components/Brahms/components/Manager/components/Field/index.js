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
    <Collapse.Panel header={<><Icon type="project" /> BRAHMS</>} key="1" style={customPanelStyle} >
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
    const {rule, possibleOptions=[], possibleOptionsFormatted, formatGoToElement} = otherProps;

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

    // console.log(props, 'rulerulerulerulerule');
    let {ruleType, ruleValue, ruleValueEnd, ruleValueId, ruleActionType, ruleAction} = rule || {};
    const condition = formatAssessmentRuleCondition(rule);
    console.log(possibleOptions, 'possibleOptions');
    let string;
    let prefix = condition;
    if (!isAnswredQuestion) {

        if (ruleType === 'between') {
            prefix += ' '+ruleValue + ' & '+ruleValueEnd;
        } else {
            prefix += ' '+ruleValue;
        }
        
    } else if (ruleValueId) {
        
        // console.log(possibleOptions, 'possibleOptions');
        // console.log(ruleValueId, 'ruleValueId');
        // console.log(answer, 'answer');
        if (possibleOptionsFormatted) {
            // console.log('aaaaaaaa');
            const answerFormatted = possibleOptions.find(a=>{
                // console.log(possibleOptionsFormatted(a));
                const {id} = possibleOptionsFormatted(a);
                return id === ruleValueId
            });
            console.log(ruleValueId, 'ruleValueId');
            console.log(answerFormatted);
            const {label:optionLabel} = possibleOptionsFormatted(answerFormatted);
            prefix = ' '+optionLabel;
        } else {
            const answer = possibleOptions.find(a=>a.id === ruleValueId);
            const {label} = answer || {};
            prefix = ' '+label;
        }
       
    }
    switch(ruleActionType) {
        case 'output':
            const {message:messageInit, attachments:attachmentsInit=[], outputActionInput} = ruleAction || {};
            const {message=messageInit, attachments=attachmentsInit} = outputActionInput || {};
            
            if (attachments.length > 0) {
                string = <>{message} (<Icon type="paper-clip" /> {attachments.length})</>;
            } else {
                string = message;
            }
        break;
        case 'notification':
            const {text:messageNotificationInit, notificationtActionInput} = ruleAction || {};
            const {text:messageNotification=messageNotificationInit} = notificationtActionInput || {};
            string = messageNotification;
        break;
        case 'cohorts':
            // console.log(ruleAction);
            const {cohorts=[]} = ruleAction || {};
            // const {plans=plansInit} = apActionInput || {};
            if (cohorts) {
                string = cohorts.map(p=> <div>{p.title}</div>);
            }
            //prefix = '';
            ruleActionType = 'Cohorts';
        break;
        case 'ap':
            // console.log(ruleAction);
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