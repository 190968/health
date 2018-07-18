import React from 'react';
import {Input,Checkbox,Divider, Select, Form,} from 'antd';
import AddressForm from '../../../../../../../../components/AddressForm';
import PhoneForm from '../../../../../../../../components/PhoneForm';
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
const Assessment = ({form}) => {
    const {getFieldDecorator} = form;
    return <Form>
                    <FormItem
                        {...formItemLayout}
                        label="Provider Name"
                        required
                    >
                        {getFieldDecorator('name', {})(
                            <Input />
                        )}
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
                    <FormItem
                    {...formItemLayout}
                        label="Tax ID"
                    >
                        {getFieldDecorator('taxId', {})(
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
                        label="Type"
                    >
                        {getFieldDecorator('type', {})(
                            <Select
                            placeholder={"Select value"}
                                style={{width: '100%'}}
                            >
                                <Option value="home">Home Health</Option>
                                <Option value="social">Social Services</Option>
                                <Option value="physical" >Physical Therapy</Option>
                                <Option value="dme">DME</Option>
                            </Select>
                        )}
                    </FormItem>   
                    <FormItem
                    {...formItemLayout}
                        label="Internal Provider"
                    >
                        {getFieldDecorator('internalProvider', {})(
                            <Checkbox >This is an internal Provider</Checkbox>
                        )}
                    </FormItem>    
                        <FormItem                        
                        >
                        <Divider>Main Contact</Divider>
                            <FormItem
                            {...formItemLayout}
                            label="Manager Email"
                            required
                        >
                            {getFieldDecorator('managerEmail', {})(
                                <Input placeholder="Enter email..."/>
                            )}
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                            label="Custom message"
                        >
                            {getFieldDecorator('customMessage', {})(
                                <Input placeholder="Enter custom message..." />
                            )}
                        </FormItem>
                        <Divider />
                    </FormItem>  
    </Form>
}

export default Assessment;