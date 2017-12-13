/**
 * Created by Pavel on 09.12.2017.
 */
import React, { PropTypes } from 'react';
import { Card, Form, Select, Input,Button } from 'antd';
import VerifyPhoneConfirm from '../../containers/verifyPhoneConfirmContainer';

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
        console.log(props);
        this.state = {showCode:false};

    }


    handleSubmit = (e) => {

        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                return onSubmit(values,this.showCode);
             }
        });
    }
    showCode =()=>{
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
console.log(this.state,"wvwev");

        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '1',
        })(
            <Select style={{ width: 70 }}>
                <Option value="+123">+123</Option>
                <Option value="+375">+375</Option>
            </Select>
        );

        const {user} = this.props.account;

        return (
            <div className="register-form" style={{padding:'0 20%'}}>
                <Card
                    title="Verify Phone"
                >
                    <Form onSubmit={this.handleSubmit} >
                        <FormItem
                            {...formItemLayout}
                            label="Phone Number"
                            hasFeedback
                        >
                            {getFieldDecorator('phone', {
                                initialValue: user.phone,
                                rules: [{ required: true, message: 'Please input your phone number!' }],
                            })(
                                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button  loading={this.state.loading}     type="primary" htmlType="submit" className="register-form-button">
                                Send
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
const WrappedVerifyPhoneForm = Form.create()(VerifyPhoneForm);
export default WrappedVerifyPhoneForm;