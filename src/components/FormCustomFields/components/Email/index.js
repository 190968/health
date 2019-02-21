import React from 'react';

import { Input, Form } from 'antd';
import { compose, withHandlers } from 'recompose';
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
const EmailFieldPure = props => {
    const {value} = props;
    return <Input value={value} onChange={props.onChange} />;
}

const enhance = compose(
    withHandlers({
        onChange: props => (e) => {
            const value = e.target.value;
            props.onChange(value);
        }
    })
);
export const EmailField = enhance(EmailFieldPure);
export default EmailField;
