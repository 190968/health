/**
 * Created by Pavel on 06.12.2017.
 */
import React from 'react';

import { Radio, Form } from 'antd';
const RadioGroup = Radio.Group;
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
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};
const GenderForm = props => {
    const { getFieldDecorator } = props;
    const { label } = props;

    console.log(props);
    return (

        <FormItem
            {...formItemLayout}
            label={label}

        >
            {getFieldDecorator('gender', {
            })(
                <RadioGroup >
                    <Radio style={radioStyle} value={1}>Male</Radio>
                    <Radio style={radioStyle} value={2}>Female</Radio>
                </RadioGroup>
            )}
        </FormItem>

    );
}

export default GenderForm;
