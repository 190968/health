import React from 'react';
import {Form, Input, Checkbox} from 'antd';
import AssessmentQuestionFieldsManager from './components/Fields';

import AssessmentQuestionAnswersFormField from './_answers';
import AssessmentQuestionBrahmsFormField from './_brahms';
import { RadioFormField } from '../../../../../FormCustomFields/components/ChoiceElement';
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
        const {title, description, numberAsPrefix=false, getAnswers=[], getBrahmsRules=[]} = question || {};
        const showBrahms = true;//question;
        // console.log(numberAsPrefix, 'numberAsPrefix');
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
                    {...formItemLayout}
                    label="Choice Display"
                    className={'single-line'}
                >
                    <span className={'ant-form-text'}>
                    {getFieldDecorator('numberAsPrefix', {
                        initialValue: numberAsPrefix === true ? 1 : 0,
                        // valuePropName: 'checked'
                    })(
                        <RadioFormField options={[{label: 'Use Letters', value: 0}, {label: 'Use Numbers', value: 1}]} />
                        // <Checkbox>Use numbers as choice prefix</Checkbox>
                    )}
                    </span>
                </FormItem>}

                <AssessmentQuestionAnswersFormField form={form} showOpenEnded={type != 'range' && type != 'dropdown'} question={question} />

                {showBrahms && <AssessmentQuestionBrahmsFormField form={form} type={'optionId'} possibleOptions={getFieldValue('answers') || getAnswers} assessment={assessment} question={question} formatGoToElement={props.formatGoToElement} />}
            </Form>
}

export default AssessmentQuestionRadioManager;