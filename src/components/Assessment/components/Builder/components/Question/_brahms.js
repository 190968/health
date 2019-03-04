import React from 'react';
import {Form } from 'antd';
import { BrahmsAsField, prepareBrahmsRulesField } from '../../../../../Brahms/components/Manager/containers/Field';
import {SelectAssessmentQuestion} from '../../containers/SelectAssessmentQuestion';

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
 
const AssessmentQuestionBrahmsFormField = props => {
        const {form, formItemLayout=formItemLayoutDefault, ...otherProps} = props;
        const {question} = props;
        const {getFieldDecorator} = form;
        const { getBrahmsRules=[]} = question || {};
        return  <FormItem
        {...formItemLayout}
        label="Brahms"
    >
        {getFieldDecorator('brahms', {
            initialValue: prepareBrahmsRulesField(getBrahmsRules),
        })(
        <BrahmsAsField {...otherProps} GoToComponent={SelectAssessmentQuestion} />
    )}
    </FormItem>
}

export default AssessmentQuestionBrahmsFormField;