import React, { PropTypes } from 'react';
import { Redirect, Link } from 'react-router-dom'
import {
    FormattedMessage,
} from 'react-intl';
import './login.css'
import gql from 'graphql-tag';
import {Modal, Form, Icon, Input, Button, Card } from 'antd';
const FormItem = Form.Item;

export class LoginForm extends React.Component {

    // fragment for the plan info
    static fragments = {
        user: gql`
        fragment CurrenUserInfo on Account {
            user {
                ...UserInfo
            }
            token
        }
        fragment UserInfo on User {
                id,
                firstName,
                lastName,
                dateFormat
                token,
                phoneConfirmed,
                newNotifications,
                newMessages,
                phone {
                    code
                    number
                }
        }
        
    `,

    }

    constructor(props) {
        super(props);
        this.state = {
            email: {
                value: 'demo2patient@fitango.com',
            },
            password: {
                value: 'Fitango2',
            },
            //loading: false,
            visible: false,
        };
        this.showModal = this.showModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };


    showModal = () => {
        this.setState({
            visible: true,
        });
    }
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
    }


    render() {
        const token = this.props.token;


        if (token !== '') {
            return  <Redirect to={{
                pathname: '/'
            }} />;
        }
        const { getFieldDecorator } = this.props.form;
        const { visible } = this.state;
        const loading = this.props.loading;
        return (<div style={{padding:'8% 35% 20px'}}>
            <Card
                title={<FormattedMessage id="user.login.card.title" defaultMessage="Login" description="Login" />}
            >
                <Modal
                    visible={visible}
                    title={<FormattedMessage id="user.login.forgot.title" defaultMessage="Forgot password?" description="Forgot password?" />}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleClick}>
                            <FormattedMessage id="user.login.forgot.send" defaultMessage="Send" description="Send" />
                        </Button>,
                    ]}
                >
                    <p><FormattedMessage id="user.login.forgot.rules" defaultMessage="Please enter the email address you registered with to help us locate your Fitango Demo account." description="Forgot rules" /></p>


                    {getFieldDecorator('forgot_email', {
                        initialValue: this.state.email.value,
                        rules: [{ required: false, type: 'email', message: 'The input is not valid E-mail!'}],
                    })(
                        <Input  placeholder={<FormattedMessage id="user.login.forgot.email" defaultMessage="Enter email" description="Enter email" />} />

                    )}

                </Modal>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('email', {
                        initialValue: this.state.email.value,
                        rules: [{ required: true, message: 'Please input valid Email!', pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder={<FormattedMessage id="user.login.email" defaultMessage="Email" description="Email" />} />
                    )}

                </FormItem>

                <FormItem>
                    {getFieldDecorator('password', {
                        initialValue: this.state.password.value,
                        /* Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.*/
                        rules: [{ required: true, pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$', message: 'Please input your Password! Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder={<FormattedMessage id="user.login.password" defaultMessage="Password" description="Password" />} />
                    )}
                </FormItem>
                <FormItem>

                    <Button type="primary" htmlType="submit"  loading={loading}  className="login-form-button">
                        Log in
                    </Button>
                    <a className="login-form-forgot" onClick={this.showModal} ><FormattedMessage id="user.login.forgot" defaultMessage="Forgot password" description="Forgot password" /></a>
                    <FormattedMessage id="user.login.or" defaultMessage="Or" description="Or" /> <Link  to={'/register'}>
                            <FormattedMessage id="user.login.sign_up" defaultMessage="Sign up" description="Sign up" />
                        </Link>
                </FormItem>
            </Form>
            </Card>
            </div>
        );
    }
}

 const WrappedLoginForm = Form.create()(LoginForm);
export default WrappedLoginForm;