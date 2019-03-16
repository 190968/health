import React from 'react';
import {Form, Input, Checkbox} from 'antd';
import AssessmentQuestionFieldsManager from './components/Fields';

import AssessmentQuestionAnswersFormField from './_answers';
import AssessmentQuestionBrahmsFormField from './_brahms';
const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout  = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 5},

    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 19},
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 5,
        },
    },
};
const AssessmentQuestionRadioManager = props => {
    
        const {question, form, type, assessment} = props;
        const {getFieldDecorator, getFieldValue} = form;
        const {title, description, numberAsPrefix, getAnswers=[], getBrahmsRules=[]} = question || {};
        const showBrahms = question;
        return <Form onSubmit={props.onSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="Question"
                >
                    {getFieldDecorator('title', {
                        initialValue: title,
                        rules: [{
                            required: true,
                            message: "Please enter question title",
                        }],
                    })(
                        <Input ref={(input) => input && input.focus()} />
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

                {type !== 'range' && <FormItem
                    {...tailFormItemLayout}
                >
                    <span className={'ant-form-text'}>
                    {getFieldDecorator('numberAsPrefix', {
                        initialValue: numberAsPrefix,
                        valuePropName: 'checked'
                    })(
                        <Checkbox>Use numbers as choice prefix</Checkbox>
                    )}
                    </span>
                </FormItem>}

                <AssessmentQuestionAnswersFormField form={form} showOpenEnded={type != 'range' && type != 'dropdown'} question={question} />

                {showBrahms && <AssessmentQuestionBrahmsFormField form={form} possibleOptions={getFieldValue('answers') || getAnswers} assessment={assessment} question={question} formatGoToElement={props.formatGoToElement} />}
            </Form>
}

export default AssessmentQuestionRadioManager;