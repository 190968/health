import React from 'react';
import {Link} from 'react-router-dom';
import {Form, Input, Card, Button, Icon, Layout} from 'antd';
import './index.less';
import backgroundImage from './assets/1920x1080.jpg';
import logoImage from './assets/logo.png';
import { withCurrentNetwork } from '../../../../queries/network';
const {Header, Content, Footer} = Layout;
const FormItem = Form.Item;


const RegisterOrganiationPure = props => {
    const {form, loadingButton} = props;
    const {getFieldDecorator} = form || {};
    return <div className={'tinyBoxAlone'}>
        <Card >
            <h3 style={{marginBottom:24}}>Thanks for stopping by the Fitango Health demo enviroment. Fill in the info below to get started!</h3>
            <Form onSubmit={props.onSubmit} id="submitForm" className="login-form">
            
                <FormItem
                // help={'Enter contact email'}
                >
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please enter Email'/*, pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/*/ }],
                    })(
                        <Input size={'large'} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder={'Email'} />
                    )}

                </FormItem>
                <FormItem
                //  help={'Eg. Fitango'}
                >
                    {getFieldDecorator('name', {
                        //initialValue: this.state.password.value,
                        /* Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.*/
                        rules: [{ required: true,  message: 'Please enter Organization' /*pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$', message: 'Please input your Password! Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.'*/ }],
                    })(
                        <Input size={'large'} prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={'Organization'} />
                    )}
                </FormItem>
                <FormItem
                // help={'Eg. 14175'}
                >
                    {getFieldDecorator('apCode', {
                        //initialValue: this.state.password.value,
                        /* Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.*/
                        rules: [{ required: true,  message: 'Enter the Code' /*pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$', message: 'Please input your Password! Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.'*/ }],
                    })(
                        <Input size={'large'} prefix={<Icon type="barcode" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={'ActionPlan Code'} />
                    )}
                </FormItem>
                <FormItem>
                    <Button loading={loadingButton} size={'large'} type="primary" block htmlType="submit" >Get Started</Button>
                </FormItem>
            </Form>
        </Card>
    </div>;
}



const RegisterOrganiation = props => {
    const {currentNetwork} = props;
    return <div class={'reg-landing-bg'} style={{height:'100%', display: 'flex', 'minHeight': '100vh', 'flexDirection':'column', backgroundImage: 'url('+backgroundImage+')'}}>
        <Header style={{background:'#fff', textAlign: 'center'}}>
           <Link to={'/'}><img alt={currentNetwork.name} className="logo" style={{height:'50px', marginRight:'5px'}} src={logoImage} /></Link>
        </Header>
        <Content className={'userside'}>
            <RegisterOrganiationPure {...props} />
        </Content>
    </div>;
}

export default withCurrentNetwork(RegisterOrganiation);