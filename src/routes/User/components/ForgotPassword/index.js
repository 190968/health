/**
 * Created by Pavel on 08.12.2017.
 */
import React from 'react';

import './index.css'
import {
    injectIntl
} from 'react-intl';
import ru from './i18n/ru';
import en from './i18n/en';
import {Link} from 'react-router-dom';
import {Form, Icon, Input, Button, Card, Layout } from 'antd';
import { withCurrentNetwork } from '../../../../queries/network';
const FormItem = Form.Item;
const {Header, Content, Footer} = Layout;
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
        const {intl}=this.props;
        return (

            <div className={'tinyBoxAlone'} >
                {/*<p>Code: {this.props.match.params.code}</p>*/}
                <Card
                    title={intl.messages.user_forgot_reset}
                >
                    <Form onSubmit={this.handleSubmit} className="login-form">

                        {!code &&
                        <FormItem
                            help={intl.messages.user_forgot_help}
                        >
                            {getFieldDecorator('code', {
                                rules: [{ required: true, message: intl.messages.user_forgot_rules}],
                            })(
                                <Input placeholder={intl.messages.user_forgot_code} />
                            )}
                        </FormItem>
                        }
                    <FormItem>
                    {getFieldDecorator('new_password', {
                        rules: [{ required: true, pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$', message:intl.messages.user_forgot_newrules  }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder={intl.messages.user_forgot_newpassword} />
                    )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('new_password_repeat', {
                            rules: [{ required: true, pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$', message: intl.messages.user_forgot_newrules  }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder={intl.messages.user_forgot_repeat}/>
                        )}
                    </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit"  loading={this.state.loading} className="login-form-button">
                                {intl.messages.user_forgot_reset}
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}


const ForgotPassword = props => {
    const {currentNetwork} = props;
    return <div  style={{height:'100%', display: 'flex', 'minHeight': '100vh', 'flexDirection':'column'}}>
    <Header style={{background:'#fff', textAlign: 'center'}}>
       <Link to={'/'}><img alt={currentNetwork.name} className="logo" style={{height:'50px', marginRight:'5px'}} src={currentNetwork.logo} /></Link>
    </Header>
    <Content className={'userside'}>
        <NormalForgotForm {...props} />
    </Content>
</div>;
}

export default injectIntl(withCurrentNetwork(ForgotPassword));