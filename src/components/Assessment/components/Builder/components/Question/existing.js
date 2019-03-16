import React from 'react';
import {Form, Input} from 'antd';
import AssessmentSelect from '../../../../../Autosuggest/containers/AssessmentSelect';
import { SelectAssessmentQuestion } from '../../containers/SelectAssessmentQuestion';
import { compose, withState, withHandlers } from 'recompose';
import AssessmentQuestionManagerPure from './index';
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

const AssessmentQuestionExistingQuestionManager = props => {
    
        const {question, form, type:typeInit, assessment, parentQuestion} = props;
        const {getFieldDecorator, getFieldValue} = form;
        const {title, description, type=typeInit, getAnswers=[], getBrahmsRules=[]} = question || {};
        const  formItemLayout=formItemLayoutDefault;
        const isTypeTime = type == 'time';
        const showBrahms = !isTypeTime && question;

        // if (parentQuestion) {
        //     return <AssessmentQuestionManager />;
        // }
        return <Form onSubmit={props.onSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="Assessment"
                >
                {getFieldDecorator('assessment')(
                    <AssessmentSelect />
                )}
                </FormItem>

                {getFieldValue('assessment') && 
                <FormItem
                    {...formItemLayout}
                    label="Question"
                >
                    {getFieldDecorator('question')(
                        <SelectAssessmentQuestion assessment={getFieldValue('assessment')} getAssessmentInfo />
                    )}
                </FormItem>
                }
            </Form>
}

 
export default (AssessmentQuestionExistingQuestionManager);

