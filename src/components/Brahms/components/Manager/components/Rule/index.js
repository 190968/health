import React from 'react';
import {Form, Input, Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const formItemLayoutDefault = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 5},

    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
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
    {key: 'output', label: 'Output'},
    {key: 'ap', label: 'Suggest ActionPlan'},
    {key: 'goto', label: 'Go To'},
];

const OPTIONS_CONDITIONAL = [
    {key: 'eq', label: 'Equal'},
    {key: 'less_than', label: 'Less Than'},
    {key: 'less_eq_than', label: 'Less/Equal Than'},
    {key: 'more_than', label: 'More Than'},
    {key: 'more_eq_than', label: 'More/Equal Than'},
    {key: 'between', label: 'Between'},
]
const BrahmsRuleManager = props => {
    
        const {rule, form, formItemLayout=formItemLayoutDefault} = props;
        const {getFieldDecorator, getFieldValue} = form;

        const {ruleType, ruleTypeValue, ruleValueId,ruleActionType} = rule || {};
        return <>
            <FormItem
                {...formItemLayout}
                label={'Condition'}
            >
                {getFieldDecorator('type', {
                    })(
                        <Select style={{width:'100%'}} >
                            {OPTIONS_CONDITIONAL.map(option => <Option key={option.key} value={option.key}>{option.label}</Option>)}
                        </Select>
                    )}
            </FormItem>

            
            <FormItem
                {...formItemLayout}
                label={'Value'}
            >
                {getFieldDecorator('value', {
                    })(
                        <Input />
                    )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={'Action'}
            >
                {getFieldDecorator('action', {
                    })(
                        <Select style={{width:'100%'}} >
                            {OPTIONS.map(option => <Option key={option.key} value={option.key}>{option.label}</Option>)}
                        </Select>
                    )}
            </FormItem>

            {getFieldValue('action') === 'output' && <FormItem
                    {...formItemLayout}
                    label="Message"
                >
                    {getFieldDecorator('message', {
                        // initialValue: description,
                    })(
                        <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                    )}
                </FormItem>}
        </>
}

export default BrahmsRuleManager;