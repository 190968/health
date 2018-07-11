import React from 'react';
import {Card,Row,Col,Select,Form,Radio,DatePicker,TimePicker, Input} from 'antd';
import moment from 'moment';
const Option = Select.Option;
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const InviteSMS = props => {
    const { form, formItemLayout,selectedObj} = props;
    let defVal = selectedObj.map(obj =>obj.user.fullName);

     const {getFieldDecorator} = form;
    return   <Form>
        <FormItem
    {...formItemLayout}
        label="Participants to invite"
    >
                    <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    defaultValue= {defVal}
                  >
                    {selectedObj.map(obj => <Option key={obj.user.fullName} value={obj.user.fullName}>{obj.user.fullName}</Option>)}
                  </Select>
    </FormItem>
    <FormItem
    {...formItemLayout}
        label="Enter your Message"
    >
                {getFieldDecorator('email', {
                })(
                    <Input />
                  
                )}
    </FormItem>
    </Form>
}

export default InviteSMS;