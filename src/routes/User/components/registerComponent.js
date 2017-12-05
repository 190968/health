/**
 * Created by Pavel on 27.11.2017.
 */
import React, { PropTypes } from 'react';
import {Redirect, Route} from 'react-router-dom'
//import {Route } from 'react-router'
//import { intl, FormattedMessage, defineMessages } from 'react-intl';
//import Messages from './i18n/register.en.json';
import { Form, Select, DatePicker, Input, Radio, Button, Checkbox } from 'antd';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
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

/*const messages = defineMessages({
    datePicker: {
        id: 'App.datePicker.title',
        defaultMessage: 'Birthday',
    },
});*/


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

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '1',
        })(
            <Select style={{ width: 70 }}>
                <Option value="1">+1</Option>
                <Option value="2">+2</Option>
            </Select>
        );

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
                    {getFieldDecorator('lastName', {
                        rules: [{ required: true, message: 'Please input your Last Name!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Gender"
                >
                    {getFieldDecorator('radio-button',{
                        rules: [{ required: true, message: 'Please Select your gender', whitespace: true }],
                    })(
                        <RadioGroup>
                            <RadioButton value="male">Male</RadioButton>
                            <RadioButton value="female">Female</RadioButton>
                        </RadioGroup>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={'Birthday'}
                    hasFeedback
                >
                    {getFieldDecorator('birthday', {
                        rules: [{
                            type: 'date', message: 'The input is not valid Date!',
                        }, {
                            required: true, message: 'Please input your Birthday',
                        }],
                    })(
                        <DatePicker />
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
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
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