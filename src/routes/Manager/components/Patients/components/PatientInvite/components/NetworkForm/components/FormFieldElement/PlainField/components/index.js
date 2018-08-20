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

    return (

        
                <Input />

    );
}

export default PlainForm;
