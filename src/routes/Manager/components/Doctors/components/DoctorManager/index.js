import React from 'react';
import {Input,Checkbox,Divider, Select, Form,} from 'antd';
import AddressForm from '../../../../../../components/AddressForm';
import PhoneForm from '../../../../../../components/PhoneForm';
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const FormItem = Form.Item;
const Option = Select.Option;

const DoctorManager = ({form, targetKeys, selectedKeys, handleChange, handleSelectChange}) => {


    const {getFieldDecorator} = form;
    // const {email='', gender='',fullName='',birthday='', phoneFormatted={},addressText={}, chemotherapies=[]} = patient;
    const children = [];
    return <Form>
    <FormItem
        {...formItemLayout}
        label="First Name"
        required
    >
        {getFieldDecorator('firstName', {})(
            <Input />
        )}
    </FormItem>
    <FormItem
        {...formItemLayout}
        label="Last Name"
        required
    >
        {getFieldDecorator('lastName', {})(
            <Input />
        )}
    </FormItem>
    <FormItem
    {...formItemLayout}
        label="Address"
        required
    >
        <AddressForm getFieldDecorator={getFieldDecorator}  />
    </FormItem>
    <FormItem
    {...formItemLayout}
    label="Phone"
    required
>
<PhoneForm getFieldDecorator={getFieldDecorator} required />
</FormItem>
    <FormItem
    {...formItemLayout}
        label="NPI"
        required
    >
        {getFieldDecorator('npi', {})(
            <Input />
        )}
    </FormItem>

   
       
</Form>
}

export default DoctorManager;