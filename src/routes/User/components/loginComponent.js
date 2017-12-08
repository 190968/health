import React, { PropTypes } from 'react';
import { Redirect, Link } from 'react-router-dom'

import './login.css'

import {Modal, Form, Icon, Input, Button, Card } from 'antd';
const FormItem = Form.Item;
const { Meta } = Card;

class NormalLoginForm extends React.Component {
    state = {
        email: {
            value: 'demo2patient@fitango.com',
        },
        password: {
            value: 'Fitango2',
        },
        loading: false,
        visible: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    // handleOk = () => {
    //     this.setState({ loading: true });
    //     setTimeout(() => {
    //         this.setState({ loading: false, visible: false });
    //     }, 1000);
    // }
    handleCancel = () => {
        this.setState({ visible: false });
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

    handleClick = (e) => {
        e.preventDefault();

        const { onClick } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {

                return onClick(values);
            }
        });
        setTimeout(() => {
            this.setState({visible: false });
        }, 1000);
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
        const { visible, loading } = this.state;
        return (<div style={{padding:'8% 35% 20px'}}>
            <Card
                title="Login"
            >
                <Modal
                    visible={visible}
                    title="Forgot Password?"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleClick}>
                            Send
                        </Button>,
                    ]}
                >
                    <p>Please enter the email address you registered with to help us locate your Fitango Demo account.</p>


                    {getFieldDecorator('forgot_email', {
                        rules: [{ required: false, message: 'Please input your Email!', whitespace: true }],
                    })(
                        <Input  placeholder="Enter email" />

                    )}

                </Modal>
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

                    <Button type="primary" htmlType="submit"  loading={this.state.loading} onClick={this.enterLoading} className="login-form-button">
                        Log in
                    </Button>
                    <a className="login-form-forgot" onClick={this.showModal} >Forgot password</a>
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