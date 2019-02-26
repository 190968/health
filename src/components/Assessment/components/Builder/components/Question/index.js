import React from 'react';
import {Form, Input} from 'antd';
import AssessmentQuestionFieldsManager from './components/Fields';
import BrahmsTable from '../../../../../Brahms/components/Table';
import { BrahmsAsField } from '../../../../../Brahms/components/Manager/containers/Field';
const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayoutDefault = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 6},

    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 18},
    },
};

const AssessmentQuestionManager = props => {
    
        const {question, form, type} = props;
        const {getFieldDecorator} = form;
        const {title, description, brahms=[]} = question || {};
        const  formItemLayout=formItemLayoutDefault;
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
                <AssessmentQuestionFieldsManager form={form} question={question} type={type} formItemLayout={formItemLayout} />

                <FormItem
                    {...formItemLayout}
                    label="Brahms"
                >
                    {getFieldDecorator('brahms', {
                        initialValue: brahms,
                    })(
                    <BrahmsAsField />
                )}
                </FormItem>
            </Form>
}

export default AssessmentQuestionManager;