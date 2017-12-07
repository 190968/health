/**
 * Created by Pavel on 06.12.2017.
 */
import React, { PropTypes } from 'react';
import { Input,Col,Select,Form, Calendar, DatePicker, InputNumber, Radio, Button, Checkbox } from 'antd';
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

        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: "+1",
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
                        <Input  placeholder="First name" defaultValue={this.props.account.user.first_name}/>
                    </Col>
                    <Col span={8}>
                        <Input  placeholder="Middle name"  />
                    </Col>
                    <Col span={8}>
                        <Input placeholder="Last name" defaultValue={this.props.account.user.last_name} />
                    </Col>
                </InputGroup>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Birthday"
            >
                <InputGroup >
                    <Col span={4}>
                        <Select   style={{ width: 120 }} >
                            <Option value="Февраль">Февраль</Option>
                            <Option value="Март">Март</Option>
                            <Option value="Апрель">Апрель</Option>
                            <Option value="Май">Май</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Select placeholder="Day" style={{ width: 120 }} >
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                            <Option value="4">4</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Select  placeholder="Year" style={{ width: 120 }} >
                            <Option value="2017">2017</Option>
                            <Option value="2016">2016</Option>
                        </Select>
                    </Col>
                </InputGroup>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Gender"
            >
                <Select defaultValue={this.props.account.user.gender}  style={{ width: 120 }} >
                    <Option value="female">female</Option>
                    <Option value="male">male</Option>
                </Select>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Phone Number"
                hasFeedback
            >
                {getFieldDecorator('phone', {
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                })(
                    <Input  addonBefore={prefixSelector} style={{ width: '100%' }} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Language"
            >
                <Select defaultValue={this.props.account.user.language}  style={{ width: 120 }} >
                    <Option value="Русский">Русский</Option>
                    <Option value="Английский">Английский</Option>
                </Select>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Date format"
            >
                <Select style={{ width: 120 }} >
                    <Option value="MM/DD/YY">MM/DD/YY</Option>
                    <Option value="DD/MM/YY">DD/MM/YY</Option>
                </Select>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Email"
            >
                <Input defaultValue={this.props.account.user.email} placeholder="Email" />
            </FormItem>
            <FormItem {...tailFormItemLayout}>
                <Button loading={this.state.loading} onClick={this.enterLoading}    type="primary" htmlType="submit" className="register-form-button">
                    Submit
                </Button>
            </FormItem>
        </Form>

              );
    }

}

const WrappedSettingForm = Form.create()(SettingForm);
export default WrappedSettingForm;
