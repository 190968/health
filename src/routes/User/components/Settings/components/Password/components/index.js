/**
 * Created by Pavel on 08.12.2017.
 */
import React, { PropTypes } from 'react';
import { Input,Form, Button } from 'antd';
import { withApollo } from 'react-apollo'
import {
    injectIntl,
    defineMessages,
    FormattedMessage
} from 'react-intl';
import messages from './mesages';
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



class PasswordForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {displayedFamily: props};
    }

    /**
     * Submit the password form
     * @param e
     */
    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                return onSubmit(values);
            }
        });
    }

    render(){

        if (this.props.loading) {
            return (
                <div className='box'>
                    Loading...
                </div>
            );
        }
        const { intl } = this.props;
        const { getFieldDecorator } = this.props.form;

        return(

            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.current_label)}
                >
                            {getFieldDecorator('current_password', {
                                rules: [{ required: true, message:intl.formatMessage(messages.current_label), whitespace: true }],
                            })(
                                <Input  placeholder={intl.formatMessage(messages.current_label)}/>
                            )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.newpass_label)}
                    help={intl.formatMessage(messages.newpass_help)}
                >

                    {getFieldDecorator('password', {
                        rules: [{ required: true, message:intl.formatMessage(messages.newpass_rule) , whitespace: true }],
                    })(
                        <Input  placeholder={intl.formatMessage(messages.newpass_label)} />

                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.confirm_newpass_label)}
                >
                    {getFieldDecorator('password_repeat', {
                        rules: [{ required: true, message:intl.formatMessage(messages.confirm_newpass_rule), whitespace: true }],
                    })(
                        <Input  placeholder={intl.formatMessage(messages.confirm_newpass_label)} />
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button loading={this.state.loading} type="primary" htmlType="submit">
                        {intl.formatMessage(messages.change_password)}
                    </Button>
                </FormItem>
            </Form>

        );
    }

}

const WrappedPasswordForm = Form.create()(PasswordForm);
export default withApollo(injectIntl(WrappedPasswordForm));
