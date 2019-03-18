import React from 'react';
import { Form, Input, Checkbox } from 'antd';
import AssessmentQuestionFieldsManager from './components/Fields';

import AssessmentQuestionAnswersFormField from './_answers';
import AssessmentQuestionBrahmsFormField from './_brahms';
import TrackerSelect from '../../../../../Autosuggest/containers/TrackerSelect';
import { withHandlers } from 'recompose';
import { TrackerInput } from '../../../../../../routes/Plan/components/Tracker';
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
        // console.log(props);
        return <TrackerInput value={value} measurement={tracker} />
    }
})(AssessmentQuestionBrahmsFormField);
const AssessmentQuestionTrackerManager = props => {

    const { question, form, type, assessment } = props;
    const { getFieldDecorator, getFieldValue } = form;
    const { id, getTracker } = question || {};
    const {label} = getTracker || {};
    const showBrahms = question;
    // console.log(getTracker, 'getTracker');
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
                <TrackerSelect disabled={id && id != ''} />
            )}
        </FormItem>
        


        {/* {showBrahms && <AssessmentQuestionBrahmsFormFieldEnhanced tracker={getFieldValue('tracker')} form={form} type={'tracker'} assessment={assessment} question={question} formatGoToElement={props.formatGoToElement} />} */}
    </Form>
}

export default AssessmentQuestionTrackerManager;