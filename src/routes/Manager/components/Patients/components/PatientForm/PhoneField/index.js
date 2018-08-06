/**
 * Created by Pavel on 06.12.2017.
 */
import React from 'react';
import PhoneFormCustom from '../../../../../../../components/PhoneForm';
import { Form } from 'antd';
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

const PhoneForm = props => {
    const { getFieldDecorator } = props;
    const { label } = props;

    return (

        <FormItem
            {...formItemLayout}
            label={label}
            required
        >
            <PhoneFormCustom phone={props.phone} getFieldDecorator={getFieldDecorator} />
        </FormItem>

    );
}

export default PhoneForm;
