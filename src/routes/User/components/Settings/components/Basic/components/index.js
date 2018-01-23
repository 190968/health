/**
 * Created by Pavel on 06.12.2017.
 */
import React, { PropTypes } from 'react';

import { Card, Input,Col,Select,Form, DatePicker, Radio, Button, } from 'antd';
import { withApollo, gql } from 'react-apollo'
import {
    injectIntl,
    defineMessages,
    FormattedMessage
} from 'react-intl';
import moment from 'moment';
import messages from '../../basic.json';
const InputGroup = Input.Group;
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
const dateFormat = 'YYYY-MM-DD';

// const messages = defineMessages({
//     first_name: {
//         id: 'user.first_name',
//         defaultMessage: 'First name',
//         description: 'First name',
//     },
// });


 class SettingForm extends React.Component{

    constructor(props){
        super(props);
        //console.log(props);
        this.state = {displayedFamily: props};
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                return onSubmit(values);
            }
        });
    }
     enterLoading = () => {
         this.setState({ loading: true });
     }


    render(){
        const settingsPlaceholder = [];
        // settingsPlaceholder.push(  {
        //     item:
        //
        // })
        if (this.props.loading) {
            return (
                <Card loading bordered={false}> Loading...
                </Card>
            );
        }
       // console.log(this.props.account.user.birthday);
        const {user} = this.props.account;
        const phone = user.phone[1];
        const code = user.phone[0];



        const { intl } = this.props;
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: code
        })(
            <Select>
                <Option value="+1">+1</Option>
                <Option value="+375">+375</Option>
            </Select>
        );


        return(

        <Form onSubmit={this.handleSubmit}>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.title)}
            >
                {getFieldDecorator('title', {
                    initialValue: user.title

                })(

                    <Select style={{ width: 120 }} >
                        {user.possibleTitles.map((title, i) => <Option key={title} value={i}>{title}</Option>)}
                    </Select>
                )}


            </FormItem>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.name)}
                
            >
                <InputGroup >
                    <Col span={8}>
                        {getFieldDecorator('first_name', {
                            initialValue: user.first_name ,
                            rules: [{ required: true, message: intl.formatMessage(messages.first_name), whitespace: true }],
                        })(
                        <Input placeholder={intl.formatMessage(messages.first_name)} />
                        )}
                    </Col>
                    <Col span={8}>
                        {getFieldDecorator('middle_name', {
                            initialValue:user.middle_name
                        })(
                        <Input  placeholder={intl.formatMessage(messages.middle_name)} />
                        )}
                    </Col>
                    <Col span={8}>
                        {getFieldDecorator('last_name', {
                            initialValue: user.last_name,
                            rules: [{ required: true, message:intl.formatMessage(messages.last_name_rule)}],
                        })(
                        <Input placeholder={intl.formatMessage(messages.last_name)} />
                        )}
                    </Col>
                </InputGroup>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.birthday)}
                
            >
                {getFieldDecorator('birthday', {
                    initialValue: moment(user.birthday, dateFormat),
                    rules: [{
                        type: 'object', message:intl.formatMessage(messages.novalid),
                    }, {
                        required: true, message:intl.formatMessage(messages.rule),
                    }],
                })(
                    <DatePicker  format={dateFormat}/>
                )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.gender)}
                
            >
                {getFieldDecorator('gender', {
                initialValue: user.gender,
                rules: [{ required: true, message:intl.formatMessage(messages.gender_rule), whitespace: true }],
            })(
                <Select style={{ width: 120 }} >
                    <Option value="female">{intl.formatMessage(messages.female)}</Option>
                    <Option value="male">{intl.formatMessage(messages.male)}</Option>
                </Select>
            )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.phone_number)}
                
            >
                {getFieldDecorator('phone', {
                    initialValue: phone,
                    rules: [{ required: true, message:intl.formatMessage(messages.phone_number_rule) }],
                })(
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.language)}
                
            > {getFieldDecorator('language', {
                initialValue: user.language,
                rules: [{ required: true, message:intl.formatMessage(messages.language_rule) }],
            })(
                <Select style={{ width: 120 }} >
                    <Option value={1}>{intl.formatMessage(messages.language_english)}</Option>
                    <Option value={2}>{intl.formatMessage(messages.language_russian)}</Option>
                </Select>
            )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.email)}
                
            >{getFieldDecorator('email', {
                initialValue: user.email,
                rules: [{ required: true, type: 'email', message:intl.formatMessage(messages.email_rule),}],
            })(
                <Input  placeholder={intl.formatMessage(messages.email)} />
            )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
                <Button loading={this.state.loading} type="primary" htmlType="submit" className="register-form-button">
                    {intl.formatMessage(messages.submit)}
                </Button>
            </FormItem>
        </Form>

              );
    }

}

const WrappedSettingForm = Form.create()(SettingForm);
export default withApollo(injectIntl(WrappedSettingForm));
