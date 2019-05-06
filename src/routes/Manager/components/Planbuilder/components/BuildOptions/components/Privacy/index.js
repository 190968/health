import React from 'react';
import { Card, Button, Form, Checkbox, InputNumber, Radio } from 'antd';
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

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

const PlanbuilderOptionsPrivacy = props => {
    const { form, plan } = props;
    const { getFieldDecorator, getFieldValue } = form;
    const { privacy, visibility } = plan || {};

    return <Card title={'Privacy'} actions={[<Button type={'primary'} onClick={props.onSubmit}>Save</Button>]}>
    <Form onSubmit={props.onSubmit}>
            <FormItem
                {...tailFormItemLayout}
            >
                {getFieldDecorator('privacy', {
                    initialValue: privacy,
                    rules: [{ required: true, message: "Input title Please", whitespace: true }],
                })(
                    <RadioGroup>
                        <RadioButton value="public">Public</RadioButton>
                        <RadioButton value="private">Private</RadioButton>
                        <RadioButton value="internal">Internal</RadioButton>
                    </RadioGroup>
                )}
            </FormItem>

            {getFieldValue('privacy') === 'internal' && <>
                <FormItem
                    {...formItemLayout}
                    label={'Visible to'}
                >
                    {getFieldDecorator('visibility', {
                        initialValue: visibility,
                        // rules: [{ required: true, message:"Enter Price" , whitespace: true }],
                    })(
                        <RadioGroup>
                            <Radio style={radioStyle} value={'3'}>Care Managers and Givers</Radio>
                            <Radio style={radioStyle} value={'2'}>All Network Members</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
            </>}
        </Form>
    </Card>;
}

export default PlanbuilderOptionsPrivacy;