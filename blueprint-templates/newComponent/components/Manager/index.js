import React from 'react';
import {Form, Input} from 'antd';

const FormItem = Form.Item;

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

const {{pascalCase $moduleName}}Manager = props => {
    const { {{camelCase $moduleName}}, form, formItemLayout=formItemLayoutDefault} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {title='', getCohorts=[], getAssessments=[], executeDate, canBeEdited=false} = {{camelCase $moduleName}} || {};
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
    </Form>
}

export default {{pascalCase $moduleName}}Manager;
