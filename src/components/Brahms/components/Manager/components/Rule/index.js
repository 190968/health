import React from 'react';
import {Form, Input, Select} from 'antd';
import {BrahmsRuleActions, prepareBrahmsRuleActionsField} from './containers/RuleActions';
import { InputWithConditionField } from '../../../../../FormCustomFields/components/InputWithCondition';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 5},

    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 19},
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    },
};

const OPTIONS = [
    {key: 'output', label: 'Display'},
    {key: 'ap', label: 'Suggest ActionPlan', labelSimple: 'ActionPlan'},
    {key: 'goto', label: 'Go To'},
    {key: 'notification', label: 'Send Notification'},
    {key: 'cohorts', label: 'Add to Cohort(s)'},
    {key: 'stop', label: 'Finish'},
];
export const OPTIONS_CONDITIONAL = [
    {key: 'equal', label: 'Equal To'},
    {key: 'less_than', label: 'Less Than'},
    {key: 'less_eq_than', label: 'Less/Equal Than'},
    {key: 'more_than', label: 'Greater Than'},
    {key: 'more_eq_than', label: 'Greater/Equal Than'},
    {key: 'between', label: 'Between'},
]


const BrahmsRuleManager = props => {
        // console.log(props, 'BrahmsRuleManager');
        const {label, type, renderInputValue, rule, form, possibleOptions=[], possibleOptionsFormatter, GoToComponent, onSubmit, assessment, plan, mode, ...otherProps } = props;
        const {excludeActions=[]} = otherProps;
        const {getFieldDecorator, getFieldValue} = form;

        const {ruleType, ruleValue,ruleValueEnd, ruleValueId,ruleActionType, ruleAction} = rule || {};

        let isAnswerBased = possibleOptions.length > 0;

        getFieldDecorator('ruleElementType', {initialValue:type})
        return <>

             
            {isAnswerBased > 0 ? <FormItem
                {...formItemLayout}
                label={'If'}
            >
                {getFieldDecorator('ruleValueId', {
                    initialValue:ruleValueId
                    })(
                        <Select style={{width:'100%'}} >
                        {possibleOptions.map((option, i) => {

                            const {id, label} = possibleOptionsFormatter ? possibleOptionsFormatter(option) : option;
                            const value = id || i;
                            return <Option key={i} value={value}>{label}</Option>
                        })}
                    </Select>
                    )}
            </FormItem> : <FormItem
                {...formItemLayout}
                label={'Value'}
            >
            <InputWithConditionField form={form} value={{condition:ruleType, min:ruleValue, max:ruleValueEnd}} renderInput={renderInputValue} conditionKey={'ruleType'} />
            </FormItem>}

            <FormItem
                {...formItemLayout}
                label={'Then'}
            >
                {getFieldDecorator('ruleActionType', {
                    initialValue:ruleActionType
                    })(
                        <Select style={{width:'100%'}} >
                            {OPTIONS.filter(o=> !excludeActions.includes(o.key)).map(option => <Option key={option.key} value={option.key}>{option.label}</Option>)}
                        </Select>
                    )}
            </FormItem>

            {(getFieldValue('ruleActionType') && getFieldValue('ruleActionType')!== 'stop') && <FormItem
                {...formItemLayout}
                label={formatAssessmentRuleAction(getFieldValue('ruleActionType'), true)}
            >
                {getFieldDecorator('ruleAction', {
                    initialValue: ruleAction
                })(
                    <BrahmsRuleActions rule={rule} assessment={assessment} plan={plan} mode={mode} type={getFieldValue('ruleActionType')} formItemLayout={formItemLayout} GoToComponent={GoToComponent} />
                )}
            </FormItem>}
        </>
}

export default BrahmsRuleManager;

export const formatAssessmentRuleCondition = rule => {
    const {ruleType='equal'} = rule || {};
    const item = OPTIONS_CONDITIONAL.find(o=>o.key == ruleType);
    
    const {label} = item || {};
    return label
}

const formatAssessmentRuleAction = (ruleActionType, showSimpleLabel = false) => {
    const item = OPTIONS.find(o=>o.key == ruleActionType);
    const {label} = item || {};
    if (showSimpleLabel) {
        const {labelSimple=label} =  item || {};
        return labelSimple;
    }
    return label
}