/**
 * Created by Pavel on 06.12.2017.
 */
import React, { PropTypes } from 'react';
import { Input,Col,Select,Form, Calendar, DatePicker, InputNumber, Radio, Button, Checkbox } from 'antd';
import { withApollo, gql } from 'react-apollo'
import moment from 'moment';
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
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

        if (this.props.loading) {
            return (
                <div className='box'>
                    Loading...
                </div>
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
                label="Title"
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
                label="Name"
                
            >
                <InputGroup >
                    <Col span={8}>
                        {getFieldDecorator('first_name', {
                            initialValue: user.first_name ,
                            rules: [{ required: true, message: 'Please input your First Name!', whitespace: true }],
                        })(
                        <Input  placeholder="First name" />
                        )}
                    </Col>
                    <Col span={8}>
                        {getFieldDecorator('middle_name', {
                            initialValue:user.middle_name
                        })(
                        <Input  placeholder="Middle name" />
                        )}
                    </Col>
                    <Col span={8}>
                        {getFieldDecorator('last_name', {
                            initialValue: user.last_name,
                            rules: [{ required: true, message: 'Please input your Last name!'}],
                        })(
                        <Input placeholder="Last name" />
                        )}
                    </Col>
                </InputGroup>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={'Birthday'}
                
            >
                {getFieldDecorator('birthday', {
                    initialValue: moment(user.birthday, dateFormat),
                    rules: [{
                        type: 'object', message: 'The input is not valid Date!',
                    }, {
                        required: true, message: 'Please input your Birthday',
                    }],
                })(
                    <DatePicker  format={dateFormat}/>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Gender"
                
            >
                {getFieldDecorator('gender', {
                initialValue: user.gender,
                rules: [{ required: true, message: 'Please input your gender!', whitespace: true }],
            })(
                <Select style={{ width: 120 }} >
                    <Option value="female">Female</Option>
                    <Option value="male">Male</Option>
                </Select>
            )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Phone Number"
                
            >
                {getFieldDecorator('phone', {
                    initialValue: phone,
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                })(
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Language"
                
            > {getFieldDecorator('language', {
                initialValue: user.language,
                rules: [{ required: true, message: 'Please select your language!' }],
            })(
                <Select style={{ width: 120 }} >
                    <Option value={1}>English</Option>
                    <Option value={2}>Russian</Option>
                </Select>
            )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label="Email"
                
            >{getFieldDecorator('email', {
                initialValue: user.email,
                rules: [{ required: true, type: 'email', message: 'The input is not valid E-mail!',}],
            })(
                <Input  placeholder="Email" />
            )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
                <Button loading={this.state.loading} type="primary" htmlType="submit" className="register-form-button">
                    Submit
                </Button>
            </FormItem>
        </Form>

              );
    }

}

const WrappedSettingForm = Form.create()(SettingForm);
export default withApollo(WrappedSettingForm);
