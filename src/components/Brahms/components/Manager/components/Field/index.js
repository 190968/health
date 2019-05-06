import React from 'react';
import {List, Collapse, Icon} from 'antd';
import { ListWithMessage } from '../../../../../UI/List';
import { BrahmsRuleManagerButton } from '../Buttons/components/Brahms';
import { BrahmsRuleDeleteButton } from '../Buttons/components/Brahms/delete';
import { branch, renderComponent } from 'recompose';
import { formatAssessmentRuleCondition } from '../Rule';
import { IconCustom } from '../../../../../FitIcon';
import { formatTimeForRender } from '../../../../../Other/utils';

 
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
    // marginBottom: 24,
    border: 0,
    overflow: 'hidden',
  };
export const BrahmsRulesView = props => {
    const {rules=[], renderRule, openBrahms=false, ...otherProps} = props;
    if (!rules || rules.length == 0) {
        return null;
    }
    const defaultActiveKey = openBrahms ? ['1'] : null;
    return <Collapse bordered={false} style={{marginTop:5}} defaultActiveKey={defaultActiveKey} expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}>
    <Collapse.Panel header={<div style={{lineHeight:'1em'}} ><IconCustom type="brahms" style={{verticalAlign1:'center',marginLeft:-5}} /> <span style={{verticalAlign: 'middle'}}>BRAHMS</span></div>} key="1" style={customPanelStyle} >
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
    const {rule, possibleOptions=[], possibleOptionsFormatted, formatGoToElement, label} = otherProps;

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
    let {ruleType, ruleElementType, ruleValue, ruleValueEnd, ruleValueId, ruleActionType, ruleAction} = rule || {};
    const condition = formatAssessmentRuleCondition(rule);
    console.log(possibleOptions, 'possibleOptions');
    console.log(props, 'props');
    console.log(ruleValueId, 'ruleValueId');
    let string;
    let prefix = condition;
    // if it's not option ID
    if (/*!isAnswredQuestion*/ ruleElementType !== 'optionId') {

        if (ruleElementType == 'time') {
            ruleValue = formatTimeForRender(ruleValue);
        }
        if (ruleType === 'between') {
            prefix += ' '+ruleValue + ' & '+ruleValueEnd;
        } else {
            prefix += ' '+ruleValue;
        }
        
    } else if (ruleValueId || ruleValueId === 0) {
        
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
            // console.log(ruleValueId, 'ruleValueId');
            console.log(answerFormatted);
            const {label:optionLabel} = possibleOptionsFormatted(answerFormatted);
            prefix = ' '+optionLabel;
        } else {
             let answer;
              console.log(Number.isInteger(ruleValueId));
            if (Number.isInteger(ruleValueId)) {
                // if number - then it's index.
                answer = possibleOptions.find((a, i)=> i === ruleValueId);
            } else {
                answer = possibleOptions.find(a=>a.id === ruleValueId);
            }
             console.log(answer);
            const {label} = answer || {};
            prefix = ' '+label;
        }
       
    }
    switch(ruleActionType) {
        case 'output':
            const {message:messageInit, attachments:attachmentsInit=[], outputActionInput} = ruleAction || {};
            const {message=messageInit, attachments=attachmentsInit} = outputActionInput || {};
            
            if (attachments.length > 0) {
                string = <>{message} ({attachments.length} {attachments.lengt > 1 ? 'attachments' : 'attachment'} <Icon type="paper-clip" /> {attachments.length})</>;
            } else {
                string = message;
            }
            ruleActionType = 'Display';
        break;
        case 'notification':
            const {text:messageNotificationInit, notificationtActionInput} = ruleAction || {};
            const {text:messageNotification=messageNotificationInit} = notificationtActionInput || {};
            string = messageNotification;
            ruleActionType = 'Notification';
        break;
        case 'cohorts':
            // console.log(ruleAction);
            const {cohorts=[]} = ruleAction || {};
            // const {plans=plansInit} = apActionInput || {};
            if (cohorts) {
                const names = cohorts.map(p=> p.title);
                // console.log(names);
                string = names.join(', ');
            }
            //prefix = '';
            ruleActionType = 'Cohorts';
        break;
        case 'ap':
            // console.log(ruleAction);
            const {plans=[], apActionInput} = ruleAction || {};
            // const {plans=plansInit} = apActionInput || {};
            // console.log(ruleAction);
            if (plans && plans.length > 0) {
                string = plans.map(p=>p.title || '');
            }
            //prefix = '';
            ruleActionType = 'ActionPlan';
        break;
        case 'goto':
            const {goToElementId} = ruleAction || {};
            // find
            if (formatGoToElement) {
                string = formatGoToElement(goToElementId);
            } else {
                string = goToElementId;
            }
            ruleActionType = 'Go To';
        break;
    }


    return <div style={{flex: '1 0'}}>
        <div><strong>{label || 'Answer'}:</strong>  {prefix}</div> 
        <div><strong>{ruleActionType}:</strong> {string}</div> 
        </div>
}