/**
 * Created by Pavel on 08.12.2017.
 */
import React, { PropTypes } from 'react';
import { Input,message,Form, Button } from 'antd';
import { withApollo } from 'react-apollo'

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
                    label="Current password"
                >
                            {getFieldDecorator('current_password', {
                                rules: [{ required: true, message: 'Please input your Current password!', whitespace: true }],
                            })(
                                <Input  placeholder="Current password" />
                            )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="New password"
                    help="Password must be at least 8 chrs contain at least one capital letter, one lowercase letter, and a number"
                >

                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your New password!', whitespace: true }],
                    })(
                        <Input  placeholder="New password" />

                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Confirm New Password"
                >
                    {getFieldDecorator('password_repeat', {
                        rules: [{ required: true, message: 'Please input your Confirm New Password!', whitespace: true }],
                    })(
                        <Input  placeholder="Confirm New Password" />
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button loading={this.state.loading} type="primary" htmlType="submit">
                        Change password
                    </Button>
                </FormItem>
            </Form>

        );
    }

}

const WrappedPasswordForm = Form.create()(PasswordForm);
export default withApollo(WrappedPasswordForm);
