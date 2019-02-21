import React from 'react';
import {Form, Input, Select, Divider, Checkbox} from 'antd';
import PhoneField, { phoneFieldValidator } from '../../../../../../components/FormCustomFields/components/Phone';
import AddressField from '../../../../../../components/FormCustomFields/components/Address';

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

const ProviderManager = props => {
    const { provider, form, formItemLayout=formItemLayoutDefault} = props;
    const {getFieldDecorator} = form;
    const {title, description, phone, isInternal=true, taxId, npi, canBeEdited=false, address} = provider || {};
    return <Form>
        <FormItem
            {...formItemLayout}
            label="Name"
        >
            {getFieldDecorator('title', {
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
            label="Description"
        >
            {getFieldDecorator('description', {
                initialValue: description,
                rules: [{
                    required: true,
                    message: "Please enter name",
                }],
            })(
                <Input />
            )}
        </FormItem>
        {/* <FormItem
                    {...formItemLayout}
                    label="Phone"
                    required
            >
            {getFieldDecorator('phone', {
                    rules: [{
                        validator: phoneFieldValidator
                    }],
                })(<PhoneField />)}

        </FormItem> */}
        <FormItem
                    {...formItemLayout}
                        label="NPI"
                        required
                    >
                        {getFieldDecorator('npi', {
                            initialValue: npi,
                        })(
                            <Input />
                        )}
        </FormItem>
        <FormItem
        {...formItemLayout}
            label="Tax ID"
        >
            {getFieldDecorator('taxId', {
                initialValue: taxId,
            })(
                <Input />
            )}
        </FormItem>

        <FormItem
        {...formItemLayout}
            label="Address"
            required
        >
            {getFieldDecorator('address', {
                    initialValue: address,
                    // rules: [{ required: true,   message:'Enter Address'}],
                })(
                    <AddressField />
                )}
        </FormItem>


        {/* <FormItem
            {...formItemLayout}
                label="Type"
            >
            {getFieldDecorator('type', {
                initialValue: type,
            })(
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
        </FormItem>    */}
        <FormItem
        {...formItemLayout}
            label="Internal Provider"
        >
            {getFieldDecorator('isInternal', {
                initialValue: isInternal,
                valuePropName: 'checked'
            })(
                <Checkbox >This is an internal Provider</Checkbox>
            )}
        </FormItem>    
         {!provider && <>               
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
        </>}
    </Form>
}

export default ProviderManager;
