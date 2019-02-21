import React from 'react';
import {Form, Input, Select} from 'antd';
import AddressField from '../../../../../../components/FormCustomFields/components/Address';
import PhoneField from '../../../../../../components/FormCustomFields/components/Phone';

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

const ProgramManager = props => {
    const { program, form, formItemLayout=formItemLayoutDefault} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {title, description, website, address, type, bussinessHours} = program || {};
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
        <FormItem
            {...formItemLayout}
            label="Logo"
        >
             
        </FormItem>
         <FormItem
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
                    <Option value="internal">In Network</Option>
                    <Option value="external">External</Option>
                </Select>
            )}
        </FormItem> 
        <FormItem
            {...formItemLayout}
            label="Category"
        >
             
        </FormItem> 
        <FormItem
            {...formItemLayout}
            label="Phone"
        >
              {getFieldDecorator('phone', {
                // initialValue: description,
            })(
                <PhoneField pureField />
            )}
        </FormItem> 
        <FormItem
            {...formItemLayout}
            label="Fax"
        >
             {getFieldDecorator('fax', {
                // initialValue: description,
            })(
                <PhoneField pureField />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="Website"
        >
            {getFieldDecorator('website', {
                initialValue: website,
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
        <FormItem
            {...formItemLayout}
            label="Business hours"
        >
            {getFieldDecorator('bussinessHours', {
                initialValue: bussinessHours,
            })(
                <Input />
            )}
        </FormItem>
    </Form>
}

export default ProgramManager;
