import React from 'react';
import {Input,Button, Select, Form,} from 'antd';
const FormItem = Form.Item;


const ProvidersManager = ({form, formItemLayout, targetKeys, selectedKeys, handleChange, handleSelectChange}) => {


    const {getFieldDecorator} = form;
    // const {email='', gender='',fullName='',birthday='', phoneFormatted={},addressText={}, chemotherapies=[]} = patient;
    const children = [];
    return <Form>
        <Button type="primary">Create new</Button>
        <Button type="primary">Select from Existing</Button>
        
    </Form>
}

export default ProvidersManager;