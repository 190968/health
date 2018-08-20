/**
 * Created by Pavel on 06.12.2017.
 */
import React from 'react';

import { Checkbox, Form } from 'antd';
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
const CohortsForm = props => {
    const { getFieldDecorator } = props;
    const { label } = props;

    return (

        
                <Checkbox ></Checkbox>

    );
}

export default CohortsForm;
