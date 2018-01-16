/**
 * Created by Pavel on 06.12.2017.
 */
import React, { PropTypes } from 'react';

import { Card, Input,Col,Select,Form, DatePicker, Radio, Button, } from 'antd';
import { withApollo, gql } from 'react-apollo'
import {
    FormattedMessage,
} from 'react-intl';
import moment from 'moment';
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
                label={<FormattedMessage id="user.settings.basic.title" defaultMessage="Title" description="Title" />}
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
                label={<FormattedMessage id="user.registration.settings.name" defaultMessage="Name" description="Name" />}
                
            >
                <InputGroup >
                    <Col span={8}>
                        {getFieldDecorator('first_name', {
                            initialValue: user.first_name ,
                            rules: [{ required: true, message: <FormattedMessage id="user.settings.basic.firstname.rule" defaultMessage="Please input your firstname" description="Please input your first name" />, whitespace: true }],
                        })(
                        <Input  placeholder={<FormattedMessage id="user.settings.basic.firstname" defaultMessage="First name" description="First name" />} />
                        )}
                    </Col>
                    <Col span={8}>
                        {getFieldDecorator('middle_name', {
                            initialValue:user.middle_name
                        })(
                        <Input  placeholder={<FormattedMessage id="user.settings.basic.middlename" defaultMessage="Middle name" description="Middle name" />} />
                        )}
                    </Col>
                    <Col span={8}>
                        {getFieldDecorator('last_name', {
                            initialValue: user.last_name,
                            rules: [{ required: true, message: <FormattedMessage id="user.settings.basic.lastname.rule" defaultMessage="Last name" description="Last name" />}],
                        })(
                        <Input placeholder={<FormattedMessage id="user.settings.basic.lastname" defaultMessage="Last name" description="Last name" />} />
                        )}
                    </Col>
                </InputGroup>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={<FormattedMessage id="user.settings.basic.birthday" defaultMessage="Birthday" description="birthday" />}
                
            >
                {getFieldDecorator('birthday', {
                    initialValue: moment(user.birthday, dateFormat),
                    rules: [{
                        type: 'object', message: <FormattedMessage id="user.settings.basic.birthday.novalid" defaultMessage="The input not valid date!" description="The input not valid date!" />,
                    }, {
                        required: true, message: <FormattedMessage id="user.settings.basic.birthday.rule" defaultMessage="Please input your birthday" description="Please input your birthday" />,
                    }],
                })(
                    <DatePicker  format={dateFormat}/>
                )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={<FormattedMessage id="user.settings.basic.gender" defaultMessage="Gender" description="Gender" />}
                
            >
                {getFieldDecorator('gender', {
                initialValue: user.gender,
                rules: [{ required: true, message: <FormattedMessage id="user.settings.basic.gender.rule" defaultMessage="Please inout your gender" description="Please input your gender" />, whitespace: true }],
            })(
                <Select style={{ width: 120 }} >
                    <Option value="female"><FormattedMessage id="user.settings.basic.female" defaultMessage="Female" description="Female" /></Option>
                    <Option value="male"><FormattedMessage id="user.settings.basic.male" defaultMessage="Male" description="Male" /></Option>
                </Select>
            )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={<FormattedMessage id="user.settings.basic.phonenumber" defaultMessage="Phone number" description="Phone number" />}
                
            >
                {getFieldDecorator('phone', {
                    initialValue: phone,
                    rules: [{ required: true, message: <FormattedMessage id="user.settings.basic.phonenumber.rule" defaultMessage="Please input your phone number" description="please input" /> }],
                })(
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={<FormattedMessage id="user.settings.basic.language" defaultMessage="Language" description="Language" />}
                
            > {getFieldDecorator('language', {
                initialValue: user.language,
                rules: [{ required: true, message: <FormattedMessage id="user.settings.basic.language.rule" defaultMessage="Please Select your language!" description="select language" /> }],
            })(
                <Select style={{ width: 120 }} >
                    <Option value={1}><FormattedMessage id="user.settings.basic.language.english" defaultMessage="English" description="English" /></Option>
                    <Option value={2}><FormattedMessage id="user.settings.basic.language.russian" defaultMessage="Russian" description="Russian" /></Option>
                </Select>
            )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={<FormattedMessage id="user.settings.basic.email" defaultMessage="Email" description="Email" />}
                
            >{getFieldDecorator('email', {
                initialValue: user.email,
                rules: [{ required: true, type: 'email', message: <FormattedMessage id="user.settings.basic.email.rule" defaultMessage="The input is not valid emal!" description="Valid email" />,}],
            })(
                <Input  placeholder={<FormattedMessage id="user.settings.basic.email.placeholder" defaultMessage="Email" description="Email" />} />
            )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
                <Button loading={this.state.loading} type="primary" htmlType="submit" className="register-form-button">
                    <FormattedMessage id="user.settings.basic.submit" defaultMessage="Submit" description="Submit" />
                </Button>
            </FormItem>
        </Form>

              );
    }

}

const WrappedSettingForm = Form.create()(SettingForm);
export default withApollo(WrappedSettingForm);
