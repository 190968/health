import React from 'react';
import { Form, Input, Checkbox } from 'antd';
import AssessmentQuestionFieldsManager from './components/Fields';

import AssessmentQuestionAnswersFormField from './_answers';
import AssessmentQuestionBrahmsFormField from './_brahms';
import TrackerSelect from '../../../../../Autosuggest/containers/TrackerSelect';
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
const AssessmentQuestionTrackerManager = props => {

    const { question, form, type, assessment } = props;
    const { getFieldDecorator, getFieldValue } = form;
    const { getTracker } = question || {};
    const showBrahms = question;
    console.log(getTracker, 'getTracker');
    return <Form onSubmit={props.onSubmit}>
        <FormItem
            {...formItemLayout}
            label="Tracker"
        >
            {getFieldDecorator('tracker', {
                initialValue: getTracker,
                rules: [{
                    required: true,
                    message: "Please select tracker",
                }],
            })(
                <TrackerSelect />
            )}
        </FormItem>
        


        {showBrahms && <AssessmentQuestionBrahmsFormField label={getFieldValue('title')} form={form} type={'number'} assessment={assessment} question={question} formatGoToElement={props.formatGoToElement} />}
    </Form>
}

export default AssessmentQuestionTrackerManager;