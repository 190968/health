/**
 * Created by Pavel on 09.12.2017.
 */
import React, { PropTypes } from 'react';
import { Card, Form, Select, Input,Button } from 'antd';

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

class VerifyPhoneConfirmForm extends React.Component {

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
                    loading: false
                });
                return onSubmit(values);
            }
        });
    }

    enterLoading = () => {
        this.setState({ loading: true });
    }
    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <div className="register-form" style={{padding:'0 20%'}}>
                <Card
                    title="Verify Phone Confirm"
                >
                    <Form onSubmit={this.handleSubmit} >
                        <FormItem
                            {...formItemLayout}
                            label="Code"
                            hasFeedback
                        >
                            {getFieldDecorator('code', {
                                rules: [{ required: true, message: 'Please input your code!' }],
                            })(
                                <Input  style={{ width: '100%' }} />
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button  loading={this.state.loading}  type="primary" htmlType="submit" className="register-form-button">
                                Send
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
const WrappedVerifyPhoneConfirmForm = Form.create()(VerifyPhoneConfirmForm);
export default WrappedVerifyPhoneConfirmForm;
