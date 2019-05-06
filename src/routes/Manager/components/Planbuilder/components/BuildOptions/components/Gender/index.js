import React from 'react';
import {Card, Button, Form, Checkbox,  InputNumber, Radio, Divider } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
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
            offset: 3,
        },
    },
};
 

const PlanbuilderOptionsGender = props => {
    const {form, plan } = props;
    const { getFieldDecorator, getFieldValue } = form;
    const {planDetails} = plan || {};
    const {gender, minAge, maxAge, adultsOnly} = planDetails || {};
    return <Card title={'Gender & Age'} actions={[<Button type={'primary'} onClick={props.onSubmit}>Save</Button>]}>
    <Form onSubmit={props.onSubmit}>
                <FormItem
                    {...formItemLayout}
                    label={'Gender'}
                >
                    {getFieldDecorator('gender', {
                        initialValue: gender
                        // rules: [{ required: true, message:"Input title Please" , whitespace: true }],
                    })(
                        <RadioGroup>
                            <RadioButton value={null}>Any</RadioButton>
                            <RadioButton value="male">Male</RadioButton>
                            <RadioButton value="female">Female</RadioButton>
                        </RadioGroup>
                    )}
                </FormItem>
                <Divider>Age</Divider>
                <FormItem
                    {...tailFormItemLayout}
                >
                     <FormItem
                        // {...tailFormItemLayout}
                        className={'no-margin'}
                    >
                        {getFieldDecorator('useMinAge', {
                            initialValue: minAge,
                            valuePropName: 'checked'
                        })(
                            <Checkbox>Minimum recomended age</Checkbox>
                        )}
                        {getFieldValue('useMinAge') && <span>{getFieldDecorator('minAge', {
                            initialValue: minAge
                        })(<InputNumber />)}</span>}
                    </FormItem>
                    <FormItem
                        // {...tailFormItemLayout}
                        className={'no-margin'}
                    >
                        {getFieldDecorator('useMaxAge', {
                            initialValue: maxAge,
                            valuePropName: 'checked'
                        })(
                            <Checkbox>Maximum recomended age</Checkbox>
                        )}
                        {getFieldValue('useMaxAge') && <span>{getFieldDecorator('maxAge', {
                            initialValue: maxAge
                        })(<InputNumber />)}</span>}
                    </FormItem>
                    <FormItem
                        // {...tailFormItemLayout}
                        className={'no-margin'}
                    >
                        {getFieldDecorator('adultsOnly', {
                            initialValue: adultsOnly,
                            valuePropName: 'checked'
                        })(
                            <Checkbox>This ActionPlan is not appropriate for persons under the age of 18</Checkbox>
                        )}
                    </FormItem>
                </FormItem>

                
            </Form>
    </Card>;
}

export default PlanbuilderOptionsGender;