/**
 * Created by Павел on 30.06.2018.
 */
import React from 'react';
import {Form, Input} from 'antd';

const FormItem = Form.Item;

export const prepareInput = (values) => {
    const {text} = values;

    return {
        defaultElement: text
    }
};

export const TreatmentBlockElementEditorPure = (props) => {

    const {form, details={}} = props;
    const {getFieldDecorator} = form;
    const {description=''} = details;

    return (
        <FormItem>
            {getFieldDecorator('text', {
                initialValue:description,
                rules: [{required: true, message: "Enter Text", whitespace: true}],
            })(
                <Input />
            )}
        </FormItem>
    );
};

export default  TreatmentBlockElementEditorPure;