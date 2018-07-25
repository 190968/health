/**
 * Created by Pavel on 06.12.2017.
 */
import React from 'react';

import { Input, Form } from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const PlainForm = ({ form, label }, props) => {
    const { getFieldDecorator } = form;


    return (

        <FormItem
            {...formItemLayout}
            label={label}
            required
        >
            {getFieldDecorator('lastName', {
            })(
                <Input />
            )}
        </FormItem>

    );
}

export default PlainForm;
