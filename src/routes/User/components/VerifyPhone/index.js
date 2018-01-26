/**
 * Created by Pavel on 09.12.2017.
 */
import React, { PropTypes } from 'react';
import { Card, Form, Select, Input,Button } from 'antd';
import VerifyPhoneConfirm from '../../containers/verifyPhoneConfirmContainer';
import {
    FormattedMessage,
} from 'react-intl';
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
        const phone = this.props.phone[1];
        const code = this.props.phone[0];
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: code,
        })(
            <Select>
                <Option value="+1">+1</Option>
                <Option value="+375">+375</Option>
            </Select>
        );



        return (
            <div className="register-form"  style={{padding:'8% 35% 20px'}}>
                <Form onSubmit={this.handleSubmit} >
                <Card
                    title="Verify Phone"
                    actions={[ <Button  loading={this.state.loading} type="primary" htmlType="submit" className="register-form-button">
                        <FormattedMessage id="user.settings.verifyphone.send" defaultMessage="Send" description="Send" />
                    </Button>]}
                >

                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage id="user.settings.verifyphone.phone" defaultMessage="Phone" description="Phone" />}
                            hasFeedback
                        >
                            {getFieldDecorator('phone', {
                                initialValue: phone,
                                rules: [{ required: true, message: <FormattedMessage id="user.settings.verifyphone.rule" defaultMessage="Please input your phone number" description="number" /> }],
                            })(
                                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                            )}
                        </FormItem>
                </Card>
                </Form>
            </div>
        );
    }
}
const WrappedVerifyPhoneForm = Form.create()(VerifyPhoneForm);
export default WrappedVerifyPhoneForm;