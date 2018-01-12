/**
 * Created by Pavel on 27.11.2017.
 */
import React, { PropTypes } from 'react';
import {Redirect, Link} from 'react-router-dom'
import './register.css'
//import {Route } from 'react-router'
//import { intl, FormattedMessage, defineMessages } from 'react-intl';
import Messages from './i18n/register.en.json';
import { Card, Form, Select, DatePicker, Input, Radio, Button, Checkbox } from 'antd';
import {
    FormattedMessage,
    FormattedNumber,
    FormattedPlural,
} from 'react-intl';
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

//const messages = defineMessages(Messages);


class NormalRegisterForm extends React.Component {

    constructor() {
        super();
        this.state = {checked:true, loading:false};
    }

    componentWillMount() {
        // Run query here(check Request api). You can check how it's done in App components.
        // and update the state with the info.
        // If in the query result it says, userIsRegistered, then show confirmRegistration components(need to create) with the following fields: Enter email(need to check if this request has the same email as we will enter), enter new password, confirm password.
    }

    handleCheckboxChange =()=> {
        this.setState({checked: !this.state.checked});
    }

    handleSubmit = (e) => {

        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                });
                return onSubmit(values);
            }
        });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback(<FormattedMessage id="user.registration.inconsistent"
                                       defaultMessage="Two passwords that you enter is inconsistent!"
                                       description="inconsistent"/>);
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value /*&& this.state.confirmDirty*/) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    enterLoading = () => {
        this.setState({ loading: true });
    }
    render() {

        const token = this.props.token;

        if (token != '') {
            return  <Redirect to={{
                pathname: '/'
            }} />;
        }
        const { getFieldDecorator } = this.props.form;

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '1',
        })(
            <Select>
                <Option value="+1">+1</Option>
                <Option value="+375">+375</Option>
            </Select>
        );

        return (
            <div className="register-form" style={{padding:'0 20%'}}>
                <Card
                    title={<FormattedMessage id="user.registration.title" defaultMessage="Sign up" description="Sign up" />}
                >
            <Form onSubmit={this.handleSubmit} >

                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage id="user.registration.firstname" defaultMessage="First name" description="First name"/>}
                    hasFeedback
                >
                    {getFieldDecorator('first_name', {
                        rules: [{ required: true, message:<FormattedMessage id="user.registration.firstname.rules" defaultMessage="Please input your First Name!" description="Please input your First Name!" /> , whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage id="user.registration.lastname" defaultMessage="Last name" description="Last name"/>}
                    hasFeedback
                >
                    {getFieldDecorator('last_name', {
                        rules: [{ required: true, message: <FormattedMessage id="user.registration.lastname.rules" defaultMessage="Please input your Last name" description="Please input your Last Name"/>, whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage id="user.registration.gender" defaultMessage="Gender" description="Gender"/>}
                    hasFeedback
                >
                    {getFieldDecorator('gender',{
                        rules: [{ required: true, message: <FormattedMessage id="user.registration.gender.rules" defaultMessage="Please Select your gender" description="Please Select your gender"/>, whitespace: true }],
                    })(
                        <RadioGroup>
                            <RadioButton value="male">Male</RadioButton>
                            <RadioButton value="female">Female</RadioButton>
                        </RadioGroup>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage id="user.registration.birthday" defaultMessage="Birthday" description="Birthday"/>}
                    hasFeedback
                >
                    {getFieldDecorator('birthday', {
                        rules: [{
                            type: 'object', message: <FormattedMessage id="user.registration.birthday.novalid" defaultMessage="Your input no valid date" description="Your input no valid date"/>,
                        }, {
                            required: true, message: <FormattedMessage id="user.registration.birthday.rules" defaultMessage="Please input your birthday" description="Please input your birthday"/>,
                        }],
                    })(
                        <DatePicker />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage id="user.registration.email" defaultMessage="Email" description="Email"/>}
                    hasFeedback
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: <FormattedMessage id="user.registration.email.novalid" defaultMessage="Your input no valid email" description="Your input no valid email"/>,
                        }, {
                            required: true,  message: <FormattedMessage id="user.registration.email.rules" defaultMessage="Please input your email" description="Please input your email"/>,
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage id="user.registration.password" defaultMessage="Password" description="Password"/>}
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true,  pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$', message:<FormattedMessage id="user.registration.registration.rules" defaultMessage="Please input your password! Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit." description="Please input your password! Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit."/>,
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage id="user.registration.confirmPassword" defaultMessage="Confirm Password" description="Confirm Password"/>}
                    hasFeedback
                >
                    {getFieldDecorator('password_repeat', {
                        rules: [{
                            required: true, message: <FormattedMessage id="user.registration.confirmPassword.rules" defaultMessage="Please confirm your password" description="Please confirm your password"/>,
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage id="user.registration.phone" defaultMessage="Phone number" description="Phone number"/>}
                    hasFeedback
                >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: <FormattedMessage id="user.registration.phone.rules" defaultMessage="Please input your phone number" description="Please input your phone number"/> }],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',

                    })(
                        <Checkbox onChange={this.handleCheckboxChange.bind(this)} ><FormattedMessage id="user.registration.read" defaultMessage="I have read our" description="I have read our"/> <a href=""><FormattedMessage id="user.registration.agreement" defaultMessage="Agreement" description="Agreement"/></a></Checkbox>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>


                    <Button disabled={this.state.checked} loading={this.state.loading} onClick={this.enterLoading}    type="primary" htmlType="submit" className="register-form-button">
                        <FormattedMessage id="user.registration.signup" defaultMessage="Sign Up" description="Sign up"/>
                    </Button>
                    <FormattedMessage id="user.registration.or" defaultMessage="Or " description="Or"/> <Link  to={'/login'}><FormattedMessage id="user.registration.loginnow" defaultMessage="login now!" description="login now"/></Link>
                </FormItem>
            </Form>
                </Card>
            </div>
        );
    }
}

const WrappedNormalRegisterForm = Form.create()(NormalRegisterForm);
export default WrappedNormalRegisterForm;