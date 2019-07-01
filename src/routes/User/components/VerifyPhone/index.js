/**
 * Created by Pavel on 09.12.2017.
 */
import React from 'react';
import { Card, Form,Button } from 'antd';
import VerifyPhoneConfirm from '../../containers/verifyPhoneConfirmContainer';
import {
    injectIntl
} from 'react-intl';

import PhoneField, { phoneFieldValidator } from '../../../../components/FormCustomFields/components/Phone';
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};


class VerifyPhoneForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {loading:false,showCode:false};

    }


    handleSubmit = (e) => {

        e.preventDefault();
        const { onSubmit } = this.props;

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading:true})
                return onSubmit(values,this.showCode);
             }
        });
    }
    showCode = () =>{
        this.setState({showCode:true})
    }
    render() {
        if (this.props.loading) {
            return (
                <div className='box'>
                    Loading...
                </div>
            );
        }
        if (this.state.showCode) {
            return (
                <VerifyPhoneConfirm />
            );
        }

        //const {account} = this.props.phone;//.user.phone;

        const { form } = this.props;
        const { getFieldDecorator } = form;
        //const phoneNumberError = form.getFieldError('phone[number]');
        const {intl, phone}=this.props;


        return (
            <div   className={'tinyBoxAlone'} style={{padding:'8% 30% 20px'}}>
                <Form onSubmit={this.handleSubmit} >
                <Card
                    title={intl.messages.user_verifyphone_verifyphone}
                    actions={[ <Button  loading={this.state.loading} type="primary" htmlType="submit" className="register-form-button">
                        {intl.messages.user_verifyphone_send}
                    </Button>]}
                >

                        <FormItem
                            {...formItemLayout}
                            label={intl.messages.user_verifyphone_phone}
                            hasFeedback
                            // validateStatus={phoneNumberError ? 'error' : ''}
                            // help={phoneNumberError || ''}
                        >

                        {getFieldDecorator('phone', {
                            initialValue:phone,
                            rules: [{
                                required: true, message: 'Enter Phone', validator: phoneFieldValidator
                            }],
                        })(
                            <PhoneField noType  />
                        )}


                        </FormItem>
                </Card>
                </Form>
            </div>
        );
    }
}
const WrappedVerifyPhoneForm = Form.create()(VerifyPhoneForm);
export default injectIntl(WrappedVerifyPhoneForm);