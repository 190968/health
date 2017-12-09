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
                return onSubmit(values, this.props.client);
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

        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: "+1"
        })(
            <Select style={{ width: 70 }}>
                <Option value="+2">+2</Option>
                <Option value="+1">+1</Option>
            </Select>
        );


        return(

        <Form onSubmit={this.handleSubmit}>
            <FormItem
                {...formItemLayout}
                label="Title"
            >
                <Select  style={{ width: 120 }} >
                    <Option value="Ms.">Ms.</Option>
                    <Option value="Mr.">Mr.</Option>
                </Select>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Name"
            >
                <InputGroup >
                    <Col span={8}>
                        {getFieldDecorator('first_name', {
                            initialValue: this.props.account.user.first_name ,
                            rules: [{ required: true, message: 'Please input your First Name!', whitespace: true }],
                        })(
                        <Input  placeholder="First name" />
                        )}
                    </Col>
                    <Col span={8}>
                        {getFieldDecorator('middle_name', {
                            initialValue:this.props.account.user.middle_name
                        })(
                        <Input  placeholder="Middle name" />
                        )}
                    </Col>
                    <Col span={8}>
                        {getFieldDecorator('last_name', {
                            initialValue: this.props.account.user.last_name,
                            rules: [{ required: true, message: 'Please input your Last name!', whitespace: true }],
                        })(
                        <Input  placeholder="Last name" />
                        )}
                    </Col>
                </InputGroup>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={'Birthday'}
                hasFeedback
            >
                {getFieldDecorator('birthday', {
                    initialValue: moment(this.props.account.user.birthday, dateFormat),
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
                initialValue: this.props.account.user.gender,
                rules: [{ required: true, message: 'Please input your gender!', whitespace: true }],
            })(
                <Select   style={{ width: 120 }} >
                    <Option value="female">female</Option>
                    <Option value="male">male</Option>
                </Select>
            )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Phone Number"
                hasFeedback
            >
                {getFieldDecorator('phone', {
                    initialValue: this.props.account.user.phone,
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                })(
                    <Input  addonBefore={prefixSelector} style={{ width: '100%' }} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Language"
            > {getFieldDecorator('language', {
                initialValue: this.props.account.user.language,
                rules: [{ required: true, message: 'Please input your language!' }],
            })(
                <Select   style={{ width: 120 }} >
                    <Option value="Русский">Русский</Option>
                    <Option value="Английский">Английский</Option>
                </Select>
            )}
            </FormItem>
            {/*<FormItem*/}
                {/*{...formItemLayout}*/}
                {/*label="Date format"*/}
            {/*>*/}
                {/*<Select style={{ width: 120 }} >*/}
                    {/*<Option value="MM/DD/YY">MM/DD/YY</Option>*/}
                    {/*<Option value="DD/MM/YY">DD/MM/YY</Option>*/}
                {/*</Select>*/}
            {/*</FormItem>*/}
            <FormItem
                {...formItemLayout}
                label="Email"
            >{getFieldDecorator('email', {
                initialValue: this.props.account.user.email,
                rules: [{ required: true, message: 'Please input your Email!' }],
            })(
                <Input  placeholder="Email" />
            )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
                <Button loading={this.state.loading}     type="primary" htmlType="submit" className="register-form-button">
                    Submit
                </Button>
            </FormItem>
        </Form>

              );
    }

}

const WrappedSettingForm = Form.create()(SettingForm);
export default withApollo(WrappedSettingForm);
