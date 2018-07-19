import React from 'react';
import { Radio , Tabs ,Input,Col,Select,Form, DatePicker,Button, } from 'antd';
import AddressForm from '../../../../../../components/AddressForm';
import PhoneForm from '../../../../../../components/PhoneForm';
const TabPane = Tabs.TabPane;
const InputGroup = Input.Group;
const RadioGroup = Radio.Group;
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
const PatientInvite = props => {
    
    //  const {getProfileForm} = props;
     const {getFieldDecorator} = props.form;
    console.log(props);
    
    return  <Form >
        <Tabs defaultActiveKey="1">
    <TabPane tab="Basic" key="1">
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
        <PhoneForm getFieldDecorator={getFieldDecorator} required  />
    </FormItem>

    <FormItem
        {...formItemLayout}
        label={"Address"}
    >
        <AddressForm getFieldDecorator={getFieldDecorator}  />
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
    </TabPane>
    <TabPane tab="Filters" key="2">
    <FormItem
        {...formItemLayout}
        label={"Date Format"}

    > {getFieldDecorator('dateFormat', {
      
    })(
        <RadioGroup>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
            <Radio value={5}>A</Radio>
            <Radio value={6}>B</Radio>
            <Radio value={7}>C</Radio>
            <Radio value={8}>D</Radio>
            <Radio value={9}>A</Radio>
            <Radio value={10}>B</Radio>
            <Radio value={11}>C</Radio>
            <Radio value={12}>D</Radio>
        </RadioGroup>
    )}
    </FormItem>
    </TabPane>
  </Tabs>

</Form>
}

export default PatientInvite;