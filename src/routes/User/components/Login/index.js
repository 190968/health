import React from 'react';
import { Redirect, Link } from 'react-router-dom'
import './login.less'
import {Form, Icon, Input, Button, Card, Layout } from 'antd';
import ForgotPasswordButton from './containers/ForgotPasswordButton';
import { withCurrentNetwork } from '../../../../queries/network';
const FormItem = Form.Item;
const {Header, Content, Footer} = Layout;

const LoginFormPure = props => {

    const {currentNetwork, currentUser={}, loadingButton=false, form} = props;
        const {token} = currentUser;
        const {allowSignUp=false} = currentNetwork;
        // if we have tolen, redirect to index page
        if (token) {
            //return <div>Redirect to dash</div>;
            return <Redirect to={{
                pathname: '/'
            }} />
        }

        const { getFieldDecorator, getFieldValue } = form;
        return (
            <div className={'tinyBoxAlone'}>
                <Card
                    title="Login"
                >
                    <Form onSubmit={props.onSubmit} id="submitForm" className="login-form">
                        <FormItem>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please enter Email'/*, pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/*/ }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder={'Email'} />
                            )}

                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                //initialValue: this.state.password.value,
                                /* Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.*/
                                rules: [{ required: true,  message: 'Please enter Password' /*pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$', message: 'Please input your Password! Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.'*/ }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder={'Password'} />//{intl.formatMessage(messages.title)}
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={props.onSubmit} loading={loadingButton}  className="login-form-button" id="submitButton">
                                Log in
                            </Button>
                            <ForgotPasswordButton email={getFieldValue('email')} />
                            {allowSignUp && <React.Fragment>
                                Or <Link to={'/register'}>Sign up</Link>
                            </React.Fragment>}
                           
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
}


const LoginForm = props => {
    const {currentNetwork} = props;
    return <div  style={{height:'100%', display: 'flex', 'minHeight': '100vh', 'flexDirection':'column'}}>
    <Header style={{background:'#fff', textAlign: 'center'}}>
       <Link to={'/'}><img alt={currentNetwork.name} className="logo" style={{height:'50px', marginRight:'5px'}} src={currentNetwork.logo} /></Link>
    </Header>
    <Content className={'userside'}>
        <LoginFormPure {...props} />
    </Content>
</div>;
}
export default withCurrentNetwork(LoginForm);