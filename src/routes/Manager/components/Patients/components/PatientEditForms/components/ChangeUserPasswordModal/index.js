import React from 'react';
import {Input, Select, Form,} from 'antd';
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    },
};


const ChangeUserPassword = (props) => {
    const {form, intl} = props;

    const {getFieldDecorator} = form;
    const children = [];
    return <Form layout='vertical'>
        <FormItem
                {...formItemLayout}
                label={intl.messages.user_password}
                hasFeedback
            >
                {getFieldDecorator('password', {
                    rules: [{
                        required: true,  pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$', message:intl.messages.user_password_rule,
                    }, {
                        validator: props.checkConfirm,
                    }],
                })(
                    <Input type="password" />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={intl.messages.user_confirmPassword}
                hasFeedback
            >
                {getFieldDecorator('passwordConfirm', {
                    rules: [{
                        required: true, message: intl.messages.user_confirmPassword_rule,
                    }, {
                        validator: props.checkPassword,
                    }],
                })(
                    <Input type="password" />
                )}
            </FormItem>
    </Form>
}

export default ChangeUserPassword;
