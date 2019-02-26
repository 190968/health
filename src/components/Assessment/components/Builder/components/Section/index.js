import React from 'react';
import {Form, Input} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

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

const AssessmentSectionManager = props => {
    
        const {section, form, formItemLayout=formItemLayoutDefault} = props;
        const {getFieldDecorator} = form;
        const {title, description} = section || {};
        return <Form onSubmit={props.onSubmit}>
            <FormItem
                {...formItemLayout}
                label="Name"
            >
                {getFieldDecorator('title', {
                    initialValue: title,
                    rules: [{
                        required: true,
                        message: "Please enter section title",
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
                })(
                    <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
  
                )}
            </FormItem>

            </Form>
}

export default AssessmentSectionManager;