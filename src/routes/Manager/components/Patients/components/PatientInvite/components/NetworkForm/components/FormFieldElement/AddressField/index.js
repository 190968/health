/**
 * Created by Pavel on 06.12.2017.
 */
import React from 'react';
import { Form } from 'antd';
import { AddressForm } from '../../../../../../../../../../../components/AddressForm';
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

const AddressFormPure = props => {
    const { getFieldDecorator } = props;
    const { label } = props;
    return (

        
            <AddressForm address={props.address} getFieldDecorator={getFieldDecorator} />

    );
}

export default AddressFormPure;
