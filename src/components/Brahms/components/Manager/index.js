import React from 'react';
import {Form, Input, Select} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayoutDefault = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 6},

    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

const possibleActionOptions = [
    ['Message', 'message'],
    ['Alert', 'alert'],
    ['Alert', 'teamAlert'],
    ['ActionPlan', 'ap'],
    ['Add to Cohort', 'cohort'],
];

const BrahmManager = props => {
    const { brahm, form, formItemLayout=formItemLayoutDefault} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {title='', getCohorts=[], getAssessments=[], executeDate, canBeEdited=false} = brahm || {};
    
    
    return <Form>
        <FormItem
            {...formItemLayout}
            label="Name"
        >
            {getFieldDecorator('name', {
                initialValue: title,
                rules: [{
                    required: true,
                    message: "Please enter name",
                }],
            })(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label="Action"
        >
            {getFieldDecorator('actionType', {
                initialValue: title,
                rules: [{
                    required: true,
                    message: "Please enter name",
                }],
            })(
                <Select>
                    {possibleActionOptions.map(action => {
                        return <Option key={action[0]}>{action[1]}</Option>
                    })}
                </Select>
            )}
        </FormItem>
    </Form>
}

export default BrahmManager;
