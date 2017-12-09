/**
 * Created by Pavel on 08.12.2017.
 */
import React, { PropTypes } from 'react';
import { Redirect, Link } from 'react-router-dom'

import './index.css'

import {Form, Icon, Input, Button, Card } from 'antd';
const FormItem = Form.Item;

class NormalForgotForm extends React.Component {
    constructor() {
        super();
        this.state = { loading:false};
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

    render() {
        // get the code from url. As it's not mandatory we can enter it manually
        const code = this.props.match.params.code;
        const { getFieldDecorator } = this.props.form;
        const { loading } = this.state;
        return (

            <div style={{padding:'8% 35% 20px'}}>
                {/*<p>Code: {this.props.match.params.code}</p>*/}
                <Card
                    title="Reset Password"
                >
                    <Form onSubmit={this.handleSubmit} className="login-form">

                        {!code &&
                        <FormItem
                            help="Please input the Code from your Email"
                        >
                            {getFieldDecorator('code', {
                                rules: [{ required: true, message: 'Please input the Code from your Email to reset Password!'}],
                            })(
                                <Input placeholder="Code" />
                            )}
                        </FormItem>
                        }
                    <FormItem>
                    {getFieldDecorator('new_password', {
                        rules: [{ required: true, pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$', message: 'Please input your Password! Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="New password" />
                    )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('new_password_repeat', {
                            rules: [{ required: true, pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$', message: 'Please input your Password! Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Repeat new password" />
                        )}
                    </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit"  loading={this.state.loading} className="login-form-button">
                                Reset Password
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalForgotForm);
export default WrappedNormalLoginForm;