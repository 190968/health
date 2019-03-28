import React from 'react';
import { Form, Input } from 'antd';
import AssessmentQuestionBrahmsFormField from './_brahms';
import { TimeField } from '../../../../../FormCustomFields';
import { withHandlers } from 'recompose';
import { formatTimeForField } from '../../../../../Other/utils';
const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        xs: { span: 20 },
        sm: { span: 5 },

    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
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

const AssessmentQuestionBrahmsFormFieldEnhanced = withHandlers({
    renderInputValue: props => () => {
        const {tracker, value} = props;
        console.log(props);
        console.log(formatTimeForField(value));
        return <TimeField value={formatTimeForField(value)} />
    }
})(AssessmentQuestionBrahmsFormField);

const AssessmentQuestionTimeManager = props => {

    const { question, form, type, assessment } = props;
    const { getFieldDecorator, getFieldValue } = form;
    const { title, description, isNumeric, getAnswers = [], getBrahmsRules = [] } = question || {};
    const showBrahms = true;//question;
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


        {showBrahms && <AssessmentQuestionBrahmsFormFieldEnhanced label={getFieldValue('title')} form={form} type={'time'} assessment={assessment} question={question} formatGoToElement={props.formatGoToElement} />}
    </Form>
}

export default AssessmentQuestionTimeManager;