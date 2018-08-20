import React from 'react';
import { Redirect, Link } from 'react-router-dom'
import {
    FormattedMessage
} from 'react-intl';
import './login.less'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import gql from 'graphql-tag';
import {Form, Icon, Input, Button, Card } from 'antd';
import ru from './i18n/ru';
import en from './i18n/en';
import ForgotPasswordButton from './containers/ForgotPasswordButton';
const FormItem = Form.Item;


const LoginForm = props => {

    const {currentUser={}, loadingButton=false, form} = props;
        const {token} = currentUser;
        // if we have tolen, redirect to index page
        if (token) {
            //return <div>Redirect to dash</div>;
            return <Redirect to={{
                pathname: '/'
            }} />
        }

        const { getFieldDecorator, getFieldValue } = form;
        return (
            <div style={{padding:'8% 35% 20px'}}>
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
                            
                            Or <Link to={'/register'}>Sign up</Link>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
}

// export class LoginForm1 extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             email: {
//                 value: 'demo2patient@fitango.com',
//             },
//             password: {
//                 value: 'Fitango2',
//             },
//             //loading: false,
//             visible: false,
//         };
//         this.showModal = this.showModal.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     };


//     showModal = () => {
//         this.setState({
//             visible: true,
//         });
//     }

//     handleCancel = () => {
//         this.setState({ visible: false });
//     }

//     handleSubmit = (e) => {
//         e.preventDefault();
//         const { onSubmit } = this.props;
//         this.props.form.validateFields((err, values) => {
//             if (!err) {
//                 this.setState({
//                     loading: true
//                 });
//                 return onSubmit(values);
//             }
//         });
//     }

//     handleClick = 
//     }


//     render() {

        
//     }
// }

export default LoginForm;