import React, { PropTypes } from 'react';
import { Redirect, Link } from 'react-router-dom'

import './login.css'

import { Form, Icon, Input, Button, Card } from 'antd';
const FormItem = Form.Item;
const { Meta } = Card;

class NormalLoginForm extends React.Component {
    state = {
        email: {
            value: 'demo2patient@fitango.com',
        },
        password: {
            value: 'Fitango1',
        },
        loading:false
    };
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
    render() {
        const token = this.props.token;

        if (token != '') {
            return  <Redirect to={{
                pathname: '/'
            }} />;
        }
        const { getFieldDecorator } = this.props.form;
        return (<div style={{padding:'0 35%'}}>
            <Card
                title="Login"
            >

            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('email', {
                        initialValue: this.state.email.value,
                        rules: [{ required: true, message: 'Please input valid Email!', pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Email" />
                    )}

                </FormItem>

                <FormItem>
                    {getFieldDecorator('password', {
                        initialValue: this.state.password.value,
                        /* Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.*/
                        rules: [{ required: true, pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$', message: 'Please input your Password! Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>

                    <Button type="primary" htmlType="submit"  loading={this.state.loading} className="login-form-button">
                        Log in
                    </Button>
                    <Link className="login-form-forgot" to={'/forgot'}>Forgot password</Link>
                    Or <Link to={'/register'}>Sign up</Link>
                </FormItem>
            </Form>
            </Card>
            </div>
        );
    }
}

 const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;