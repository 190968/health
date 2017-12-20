/**
 * Created by Pavel on 08.12.2017.
 */
import React, { PropTypes } from 'react';
import { Input,message,Form, Button } from 'antd';
import { withApollo } from 'react-apollo'
import {
    FormattedMessage,
    FormattedNumber,
    FormattedPlural,
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

        const { getFieldDecorator } = this.props.form;

        return(

            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage id="user.settings.password.currentpassword.label" defaultMessage="Current password" description="Current password" />}
                >
                            {getFieldDecorator('current_password', {
                                rules: [{ required: true, message: <FormattedMessage id="user.settings.password.currentpassword.rule" defaultMessage="Current password" description="Current password" />, whitespace: true }],
                            })(
                                <Input  placeholder={<FormattedMessage id="user.settings.password.currentpassword" defaultMessage="Current password" description="Current password" />}/>
                            )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage id="user.settings.password.newpassword.label" defaultMessage="New Password" description="New Password" />}
                    help={<FormattedMessage id="user.settings.password.newpassword.help" defaultMessage="Password must be at least 8 chrs contain at least one capital letter, one lowercase letter, and a number" description="Password must be at least 8 chrs contain at least one capital letter, one lowercase letter, and a number" />}
                >

                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: <FormattedMessage id="user.settings.password.newpassword.rule" defaultMessage="Please input your new password" description="new password" />, whitespace: true }],
                    })(
                        <Input  placeholder={<FormattedMessage id="user.settings.password.new" defaultMessage="New password" description="New password" />} />

                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage id="user.settings.password.confirm.label" defaultMessage="Confirm New Password" description="Confirm New password" />}
                >
                    {getFieldDecorator('password_repeat', {
                        rules: [{ required: true, message: <FormattedMessage id="user.settings.password.confirm.rule" defaultMessage="Please confirm your New password" description="Confirm New password" />, whitespace: true }],
                    })(
                        <Input  placeholder={<FormattedMessage id="user.settings.password.confirm" defaultMessage="Confirm New Password" description="Confirm New password" />} />
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button loading={this.state.loading} type="primary" htmlType="submit">
                        <FormattedMessage id="user.settings.password.change" defaultMessage="Change password" description="Change password" />
                    </Button>
                </FormItem>
            </Form>

        );
    }

}

const WrappedPasswordForm = Form.create()(PasswordForm);
export default withApollo(WrappedPasswordForm);
