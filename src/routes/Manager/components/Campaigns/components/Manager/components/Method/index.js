import React from 'react';
import { Radio, Input, Form } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

const CampaignManagerMethodPure = props => {
    const {onChange, form, campaign, formItemLayout} = props;
    const {getFieldDecorator} = form;
    const {subject, message} = campaign || {};
    return <>
    <FormItem
            {...formItemLayout}
            label="Select how to contact"
        >
            {getFieldDecorator('contactType', {
                initialValue: 'email'
            })(
                <RadioGroup onChange={onChange}  style={{marginTop:4}}>
        <Radio style={radioStyle} value={'email'}>Email</Radio>
        <Radio style={radioStyle} disabled value={'usps'}>USPS Mail</Radio>
        <Radio style={radioStyle} disabled value={'phone'}>Phone Call</Radio>
    </RadioGroup>
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label="Subject"
        >
            {getFieldDecorator('subject', {
                initialValue: subject
            })(
                <Input placeholder={'Subject'} />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="Message"
        >
            {getFieldDecorator('message', {
                initialValue: message,
            })(
                <TextArea  placeholder={'Message'} autosize={{ minRows: 2, maxRows: 6 }} />
            )}
        </FormItem>
    
    
  
  </>;
}

export default CampaignManagerMethodPure;