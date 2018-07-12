import React from 'react';
import { Card, Input,Col,Select,Form, DatePicker,Button, } from 'antd';
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
const dateFormat = 'YYYY/MM/DD';
const PatientInvite = ({form, formItemLayout, targetKeys, selectedKeys, handleChange, handleSelectChange}) => {


    const {getFieldDecorator} = form;
    // const {email='', gender='',fullName='',birthday='', phoneFormatted={},addressText={}, chemotherapies=[]} = patient;
    const children = [];
    return  <Form >
    <FormItem
        {...formItemLayout}
        label="Title"
    >
        {getFieldDecorator('title', {
            // initialValue: user.title

        })(

            <Select style={{ width: 120 }} >
                {/* {user.possibleTitles.map((title, i) => <Option key={title} value={i}>{title}</Option>)} */}
            </Select>
        )}


    </FormItem>
    <FormItem
        {...formItemLayout}
        label={"Name"}
        required
    >
        <InputGroup >
            <Col span={8}>
                {getFieldDecorator('firstName', {
                    // initialValue: user.firstName ,
                    rules: [{ required: true, message: "intl.messages.user_first_name_rule", whitespace: true }],
                })(
                <Input placeholder="First Name" />
                )}
            </Col>
            <Col span={8}>
                {getFieldDecorator('middleName', {
                    //initialValue:user.middleName
                })(
                <Input  placeholder="Middle Name" />
                )}
            </Col>
            <Col span={8}>
                {getFieldDecorator('lastName', {
                    //initialValue: user.lastName,
                    rules: [{ required: true, message:"intl.messages.user_last_name_rule"}],
                })(
                <Input placeholder="Last Name"  />
                )}
            </Col>
        </InputGroup>
    </FormItem>
    <FormItem
        {...formItemLayout}
        label={"Birthday"}

    >
        {getFieldDecorator('birthday', {
            // initialValue: moment(user.birthday),
            rules: [{
                type: 'object', message:"intl.messages.user_birthday_novalid",
            }, {
                required: true, message:"intl.messages.user_birthday_rule",
            }],
        })(
             <DatePicker format={dateFormat} allowClear={false} disabledDate={this.disabledDate} />
        )}
    </FormItem>

    <FormItem
        {...formItemLayout}
        label={"Gender"}

    >
        {getFieldDecorator('gender', {
        rules: [{ required: true, message:"intl.messages.user_gender_rule", whitespace: true }],
    })(
        <Select style={{ width: 120 }} >
            <Option value="female">Female</Option>
            <Option value="male">Male</Option>
        </Select>
    )}
    </FormItem>


    <FormItem
        {...formItemLayout}
        label={"Email"}

    >{getFieldDecorator('email', {
        // initialValue: user.email,
        rules: [{ required: true, type: 'email', message:"intl.messages.user_email_rule",}],
    })(
        <Input  placeholder={"Email"} />
    )}
    </FormItem>

    <FormItem
        {...formItemLayout}
        label={"Phone number"}
        required
        // validateStatus={phoneNumberError ? 'error' : ''}
        // help={phoneNumberError || ''}
    >
        {/* <PhoneForm getFieldDecorator={getFieldDecorator} required phone={phone} /> */}
    </FormItem>

    <FormItem
        {...formItemLayout}
        label={"Address"}
    >
        {/* <AddressForm getFieldDecorator={getFieldDecorator} countries={countries} states={states} address={user.address} /> */}
    </FormItem>

    <FormItem
        {...formItemLayout}
        label={"Language"}

    > {getFieldDecorator('language', {
        // initialValue: user.language,

    })(
        <Select placeholder={"Language"}  >
            {/* {languages.map(language => <Option key={language.value} value={language.value}>{language.label}</Option>)} */}
        </Select>
    )}
    </FormItem>

    <FormItem
        {...formItemLayout}
        label={"Timezone"}

    > {getFieldDecorator('timezone', {
        // initialValue: user.timezone,
    })(
        <Select >
            {/* {timezones.map(timezone => <Option key={timezone.id} value={timezone.id}>{timezone.name}</Option>)} */}
        </Select>
    )}
    </FormItem>


    <FormItem
        {...formItemLayout}
        label={"Date Format"}

    > {getFieldDecorator('dateFormat', {
      
    })(
        <Select style={{ width: 150 }} >
            <Option value={1}>MM/DD/YY</Option>
            <Option value={2}>DD/MM/YY</Option>
        </Select>
    )}
    </FormItem>
</Form>
}

export default PatientInvite;