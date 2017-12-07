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

// export var  testData={
//     first_name: "Lucy",
//     middle_name: null,
//     last_name: "Perkins",
//     birthday: "1988-02-03",
//     gender: "female",
//     phone: "12313",
//     language: "2",
//     email: "sdfsdf"
// }

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

    render(){

            console.log(this.props.data.account);


        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '1',
        })(
            <Select style={{ width: 70 }}>
                <Option value="1">+1</Option>
                <Option value="2">+2</Option>
            </Select>
        );


        return(

        <Form onSubmit={this.handleSubmit}>
            <FormItem
                {...formItemLayout}
                label="Title"
            >
                <Select defaultValue="lucy" style={{ width: 120 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled">Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Name"
            >
                <InputGroup >
                    <Col span={8}>
                        <Input  placeholder="First name" />
                    </Col>
                    <Col span={8}>
                        <Input  placeholder="Middle name" />
                    </Col>
                    <Col span={8}>
                        <Input placeholder="Last name" />
                    </Col>
                </InputGroup>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Birthday"
            >
                <InputGroup >
                    <Col span={4}>
                        <Select  defaultValue="Январь" style={{ width: 120 }} >
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
                <Select value={this.state.displayedFamily.gender} defaultValue="Женский" style={{ width: 120 }} >
                    <Option value="Женский">Женский</Option>
                    <Option value="Мужской">Мужской</Option>
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
                <Select value={this.state.displayedFamily.language} defaultValue="Русский" style={{ width: 120 }} >
                    <Option value="Русский">Русский</Option>
                    <Option value="Английский">Английский</Option>
                </Select>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Date format"
            >
                <Select defaultValue="MM/DD/YY" style={{ width: 120 }} >
                    <Option value="MM/DD/YY">MM/DD/YY</Option>
                    <Option value="DD/MM/YY">DD/MM/YY</Option>
                </Select>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Email"
            >
                <Input value={this.state.displayedFamily.email} placeholder="Email" />
            </FormItem>
        </Form>

              );
    }

}

const WrappedSettingForm = Form.create()(SettingForm);
export default WrappedSettingForm;
