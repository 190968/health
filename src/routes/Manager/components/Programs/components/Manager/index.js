import React from 'react';
import {Form, Input, Select} from 'antd';
import AddressField from '../../../../../../components/FormCustomFields/components/Address';
import PhoneField from '../../../../../../components/FormCustomFields/components/Phone';
import { SimpleUpload } from '../../../../../../components/FormCustomFields/components/Attachments/upload';
import { prepareUrlForForm } from '../../../../../../components/FormCustomFields/components/Attachments';
import { NetworkProgramCategorySelect, prepareNetworkProgramCategoryForForm } from '../../../../../../components/Autosuggest/containers/NetworkProgramCategorySelect';
import { CustomOptionsList } from '../../../../../../components/FormCustomFields/containers/CustomOptionsList';
import {withProps, compose, withHandlers} from 'recompose';
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

const enhance = compose(
    withHandlers({
        onChange: props => (value, selectedOptions) => {
            // console.log(value, 'value');
            // console.log(selectedOptions, 'selectedOptions');
            if (props.onChange) {
                // const categoryId = value[value.length-1];
                props.onChange(value);
            }
        }
    })
);
const NetworkProgramCategorySelectEnhanced = enhance(NetworkProgramCategorySelect);



const ProgramManager = props => {
    const { program, form, formItemLayout=formItemLayoutDefault} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {title, logo, description, website, address, programType, businessHours, categories} = program || {};
    console.log(categories, 'categories');
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
        <FormItem
            {...formItemLayout}
            label="Logo"
        >
        {getFieldDecorator('logo', {
            initialValue: prepareUrlForForm(logo),
            rules: [{
                required: true,
                // message: "Please enter name",
            }],
        })(
            <SimpleUpload template='network_logo' />
        )}
        
             
        </FormItem>
         <FormItem
            {...formItemLayout}
                label="Type"
            >
            {getFieldDecorator('type', {
                initialValue: programType,
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
             {getFieldDecorator('categoryIds', {
                initialValue: categories.map(c => prepareNetworkProgramCategoryForForm(c)),
            })(
                <CustomOptionsList CustomComponent={NetworkProgramCategorySelectEnhanced} blankItem={[]} />
            )}
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
            {getFieldDecorator('businessHours', {
                initialValue: businessHours,
            })(
                <Input />
            )}
        </FormItem>
    </Form>
}

export default ProgramManager;
