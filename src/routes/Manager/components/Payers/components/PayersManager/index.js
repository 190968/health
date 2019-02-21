import React from 'react';
import {Input, Select, Form,} from 'antd';
const FormItem = Form.Item;


const PayersManager = ({form, formItemLayout, targetKeys, selectedKeys, handleChange, handleSelectChange}) => {


    const {getFieldDecorator} = form;
    const children = [];
    return <Form layout='vertical'>
        <FormItem
        {...formItemLayout}
            label="Name"
        >
            {getFieldDecorator('name', {})(
                  <Input />
            )}
        </FormItem>
        <FormItem
         {...formItemLayout}
            label="HP Code"
        >
            {getFieldDecorator('hpcode', {})(
                <Input />
            )}
        </FormItem>
    </Form>
}

export default PayersManager;