/**
 * Created by Pavel on 09.12.2017.
 */
import React, { PropTypes } from 'react';
import { Card, Form, Input,Button } from 'antd';
import {
    FormattedMessage,
} from 'react-intl';
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
        this.state = {loading:false};
    }

    handleSubmit = (e) => {

        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                });
                return onSubmit(values, this.props.userId);
            }
        });
    }

    render() {

        const { getFieldDecorator } = this.props.form;
        return (
            <div className="register-form" style={{padding:'8% 35% 20px'}}>
                <Form onSubmit={this.handleSubmit} >
                <Card
                    title={<FormattedMessage id="user.settings.verifyconfirm" defaultMessage="Verify Phone Confirm" description="Confirm" />}
                    actions={[ <Button  loading={this.state.loading}  type="primary" htmlType="submit" className="register-form-button">
                        <FormattedMessage id="user.settings.verifyconfirm.send" defaultMessage="Send" description="Send"/>
                    </Button>]}
                >

                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage id="user.settings.verifyconfirm.code" defaultMessage="Code" description="Code" />}
                            hasFeedback
                        >
                            {getFieldDecorator('code', {
                                rules: [{ required: true, message: <FormattedMessage id="user.settings.verifyconfirm.rule" defaultMessage="Please input your code" description="code" /> },
                                    {len:4, message:'must be 4 digits'}
                                ],
                            })(
                                <Input size="large" />
                            )}
                        </FormItem>

                </Card>
                </Form>
            </div>
        );
    }
}
const WrappedVerifyPhoneConfirmForm = Form.create()(VerifyPhoneConfirmForm);
export default WrappedVerifyPhoneConfirmForm;
