import React from 'react';
import {Form } from 'antd';
import { prepareBrahmsRulesField, BrahmsAsField } from '../../../../../../components/Brahms/components/Manager/containers/Field';

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
 
const PlanElementBrahmsFormField = props => {
        const {form, formItemLayout=formItemLayoutDefault, ...otherProps} = props;
        const {element, GoToComponent} = props;
        const {getFieldDecorator} = form;
        const { getBrahmsRules=[]} = element || {};
        return  <FormItem
        {...formItemLayout}
        label="BRAHMS"
    >
        {getFieldDecorator('brahms', {
            initialValue: prepareBrahmsRulesField(getBrahmsRules),
        })(
        <BrahmsAsField {...otherProps} GoToComponent={GoToComponent} />
    )}
    </FormItem>
}

export default PlanElementBrahmsFormField;