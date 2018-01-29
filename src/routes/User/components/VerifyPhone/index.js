/**
 * Created by Pavel on 09.12.2017.
 */
import React, { PropTypes } from 'react';
import { Card, Form, Select, Input,Button } from 'antd';
import VerifyPhoneConfirm from '../../containers/verifyPhoneConfirmContainer';
import {
    FormattedMessage,
} from 'react-intl';
import PhoneForm from '../../../../components/PhoneForm';
const Option = Select.Option;
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
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
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
        //console.log();
        //const {account} = this.props.phone;//.user.phone;

        const { form } = this.props;
        const { getFieldDecorator } = form;
        const phoneNumberError = form.getFieldError('phone[number]');



        return (
            <div className="register-form"  style={{padding:'8% 30% 20px'}}>
                <Form onSubmit={this.handleSubmit} >
                <Card
                    title="Verify Phone"
                    actions={[ <Button  loading={this.state.loading} type="primary" htmlType="submit" className="register-form-button">
                        <FormattedMessage id="user.settings.verifyphone.send" defaultMessage="Send" description="Send" />
                    </Button>]}
                >

                        <FormItem
                            {...formItemLayout}
                            label={'Phone'}
                            hasFeedback
                            validateStatus={phoneNumberError ? 'error' : ''}
                            help={phoneNumberError || ''}
                        >

                            <PhoneForm getFieldDecorator={getFieldDecorator} required phone={this.props.phone} />

                        </FormItem>
                </Card>
                </Form>
            </div>
        );
    }
}
const WrappedVerifyPhoneForm = Form.create()(VerifyPhoneForm);
export default WrappedVerifyPhoneForm;