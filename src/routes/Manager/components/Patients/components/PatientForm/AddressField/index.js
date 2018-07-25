/**
 * Created by Pavel on 06.12.2017.
 */
import React from 'react';
import AddressFormCustom from '../../../../../../../components/AddressForm';
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

const AddressForm = props => {
    const { getFieldDecorator } = props;
    const { label } = props;

    return (

        <FormItem
            {...formItemLayout}
            label={label}
            required
        >
            <AddressFormCustom getFieldDecorator={getFieldDecorator} />
        </FormItem>

    );
}

export default AddressForm;