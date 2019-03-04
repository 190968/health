import React from 'react';
import {Form, Input, Checkbox} from 'antd';
import { AssessmentQuestionAnswersListManager } from '../../containers/AnswersList';
import { prepareAssessmentQuestionAnswerField } from '../../containers/Answer';
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
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    },
};

const AssessmentQuestionFieldsManager = props => {
        const {question, type:typeInit, form, formItemLayout=formItemLayoutDefault} = props;
        const {getFieldDecorator} = form;
        const {isNumeric=false, isMultiple=false, numberAsPrefix=false, getAnswers=[], type=typeInit} = question || {};
        if (type === 'input') {
            return <>
            
            </>;
        } else if (type === 'time') {
            return null
        } else if (type === 'range' || type === 'dropdown') {
            return  <FormItem
            {...formItemLayout}
            label={'Answers'}
            >
                {getFieldDecorator('answers', {
                        initialValue: prepareAnswers(getAnswers),
                })(
                    <AssessmentQuestionAnswersListManager question={question} formItemLayout={formItemLayout} />
                )}
            </FormItem>
        }
        return <>
            <FormItem
                {...tailFormItemLayout}
            >
                <span className={'ant-form-text'}>
                {getFieldDecorator('isMultiple', {
                    initialValue: isMultiple,
                    valuePropName: 'checked'
                })(
                    <Checkbox>User can select more than 1 answer</Checkbox>
                )}
                </span>
            </FormItem>
            <FormItem
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
            </FormItem>


            <FormItem
        {...formItemLayout}
        label={'Answers'}
        >
            {getFieldDecorator('answers', {
                    initialValue: prepareAnswers(getAnswers),
            })(
                <AssessmentQuestionAnswersListManager question={question} formItemLayout={formItemLayout} />
            )}
        </FormItem>
        </>
}
 
export default AssessmentQuestionFieldsManager;

const prepareAnswers = answers => {
    if (answers) {
        return  answers.map(a => prepareAssessmentQuestionAnswerField(a));
    }
    return [];
}
