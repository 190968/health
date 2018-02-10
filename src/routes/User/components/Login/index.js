import React, { PropTypes } from 'react';
import { Redirect, Link } from 'react-router-dom'
import {
    injectIntl,
    FormattedMessage
} from 'react-intl';
import './login.css'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import gql from 'graphql-tag';
import {Modal, Form, Icon, Input, Button, Card } from 'antd';
const FormItem = Form.Item;
configure({ adapter: new Adapter() });
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
            pasha:"guzu",
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
    Test = (text) => {
        return text;
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
        return (
            <div style={{padding:'8% 35% 20px'}}>
            <Card
                title="Login"//{intl.formatMessage(messages.title)}
            >
            <Form onSubmit={this.handleSubmit} id="submitForm" className="login-form">
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
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder={<FormattedMessage id="user.login.password" defaultMessage="Password" description="Password" />} />//{intl.formatMessage(messages.title)}
                    )}
                </FormItem>
                <FormItem>

                    <Button type="primary" htmlType="submit"  loading={loading}  className="login-form-button" id="submitButton">
                        Log in
                    </Button>
                    <a className="login-form-forgot" onClick={this.showModal} >Forgot password</a>
                   Or
                    {/*<Link to={'/register'}>*/}
                        {/*Sign up*/}
                    {/*</Link>*/}


                </FormItem>

            </Form>
            </Card>
            </div>
        );
    }
}

 const WrappedLoginForm = Form.create()(LoginForm);
export default WrappedLoginForm;

