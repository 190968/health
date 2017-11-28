/**
 * Created by Pavel on 27.11.2017.
 */
import React, { PropTypes } from 'react';
import {Redirect, Route} from 'react-router-dom'
//import {Route } from 'react-router'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
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
class NormalRegisterForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                return onSubmit(values);
            }
        });
    }
    render() {

        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>

                <FormItem
                    {...formItemLayout}
                    label="First Name"
                    hasFeedback
                >
                    {getFieldDecorator('firstName', {
                        rules: [{ required: true, message: 'Please input your First Name!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Last Name"
                    hasFeedback
                >
                    {getFieldDecorator('firstName', {
                        rules: [{ required: true, message: 'Please input your Last Name!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="E-mail"
                    hasFeedback
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Password"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Confirm Password"
                    hasFeedback
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Phone Number"
                >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(
                        <Input addonBefore={"+375"} style={{ width: '100%' }} />
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" className="register-form-button">
                       Register
                    </Button>
                    Or <a href="/login">login now!</a>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalRegisterForm = Form.create()(NormalRegisterForm);
export default WrappedNormalRegisterForm;