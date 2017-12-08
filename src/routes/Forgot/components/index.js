/**
 * Created by Pavel on 08.12.2017.
 */
import React, { PropTypes } from 'react';
import { Redirect, Link } from 'react-router-dom'

import './forgot.css'

import {Modal, Form, Icon, Input, Button, Card } from 'antd';
const FormItem = Form.Item;
const { Meta } = Card;

class NormalForgotForm extends React.Component {
    constructor() {
        super();
        this.state = { loading:false};
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            let code = this.props.match.params.code;
            if (!err) {
                this.setState({
                    loading: true
                });
                return onSubmit(values,code);
            }
        });
    }
    enterLoading = () => {
        this.setState({ loading: true });
    }

    render() {

        const { getFieldDecorator } = this.props.form;
        const { loading } = this.state;
        return (

            <div style={{padding:'8% 35% 20px'}}>
                {/*<p>Code: {this.props.match.params.code}</p>*/}
                <Card
                    title="Forgot password"
                >
                    <Form onSubmit={this.handleSubmit} className="login-form">
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
                            <Button type="primary" htmlType="submit"  loading={this.state.loading} onClick={this.enterLoading} className="login-form-button">
                                Send
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