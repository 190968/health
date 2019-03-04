import React from 'react';
import {Form } from 'antd';
import { prepareAssessmentQuestionAnswersField } from './containers/Answer';
import { AssessmentQuestionAnswersListManager } from './containers/AnswersList';
const FormItem = Form.Item;

const formItemLayoutDefault  = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 5},

    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 19},
    },
};
 
const AssessmentQuestionAnswersFormField = props => {
        const {question, form, formItemLayout=formItemLayoutDefault, showOpenEnded} = props;
        const {getFieldDecorator} = form;
        const { getAnswers=[]} = question || {};
        const answers = getAnswers.map((a, i) => ({...a, i}));
        return  <FormItem
        {...formItemLayout}
        label={'Answers'}
        >
            {getFieldDecorator('answers', {
                    initialValue: prepareAssessmentQuestionAnswersField(answers),
            })(
                <AssessmentQuestionAnswersListManager question={question} formItemLayout={formItemLayout} showOpenEnded={showOpenEnded} />
            )}
        </FormItem>
}

export default AssessmentQuestionAnswersFormField;