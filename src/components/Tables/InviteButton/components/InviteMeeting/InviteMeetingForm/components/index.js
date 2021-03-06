import React from 'react';
import {Card,Row,Col,Select,Form,Radio,DatePicker,TimePicker, Input} from 'antd';
import moment from 'moment';
const Option = Select.Option;
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const InviteMeeting = props => {
const { form, formItemLayout,selectedObj} = props;
let defVal,options;
if(selectedObj[0].fullName){
    defVal = selectedObj.map(obj =>obj.fullName);
    options = selectedObj.map(obj => <Option key={obj.fullName} value={obj.fullName}>{obj.fullName}</Option>)
} else {
    defVal = selectedObj.map(obj =>obj.user.fullName);
    options = selectedObj.map(obj => <Option key={obj.user.fullName} value={obj.user.fullName}>{obj.user.fullName}</Option>)
}

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
                  {
                      options
                  }
                  </Select>
    </FormItem>
    <FormItem
      {...formItemLayout}
        label="Title"
    >
                {getFieldDecorator('title', {
                })(
                    <Input />
                  
                )}
    </FormItem>
    <FormItem
      {...formItemLayout}
        label="Date"
    >
                {getFieldDecorator('date', {
                })(
                    <DatePicker />
                  
                )}
    </FormItem>
    <FormItem
      {...formItemLayout}
        label="Time"
    >
                {getFieldDecorator('time', {
                })(
                    <TimePicker />
                  
                )}
    </FormItem>
    <FormItem
      {...formItemLayout}
        label="Duration"
    >
                {getFieldDecorator('duration', {
                })(
                    <Select defaultValue="15 mins"  >
                        <Option value="15">15 mins</Option>
                        <Option value="30">30 mins</Option>
                        <Option value="45">45 mins</Option>
                        <Option value="60">60 mins</Option>
                    </Select>
                  
                )}
    </FormItem>
    <FormItem
      {...formItemLayout}
        label="Type"
    >
                {getFieldDecorator('type', {
                })(
                    <Select defaultValue="Select type"  >
                        <Option value="Select type">Select type</Option>
                        <Option value="In person">In person</Option>
                        <Option value="Phone">Phone</Option>
                        <Option value="Online Chat">Online Chat</Option>
                        <Option value="Video">Video</Option>
                    </Select>
                  
                )}
    </FormItem>
    <FormItem
      {...formItemLayout}
        label="Custom message"
    >
                {getFieldDecorator('custom_message', {
                })(
                    <Input />
                  
                )}
    </FormItem>
    <FormItem
      {...formItemLayout}
        label="Color"
    >
                {getFieldDecorator('color', {
                })(
                    <Row>
                        <RadioGroup defaultValue="1">
                            <Col span={4} >
                                <RadioButton style={{background:"#008B8B"}} value={1}  />
                            </Col>    
                            <Col span={4} ofsset={1} >
                                <RadioButton style={{background:"#32CD32"}} value={2}  />
                            </Col>  
                            <Col span={4}  ofsset={1} >    
                                <RadioButton style={{background:"#40E0D0"}} value={3}  />
                            </Col>  
                            <Col  span={4} ofsset={1}>    
                                <RadioButton style={{background:"#FFD700"}} value={4}  />
                            </Col>      
                            <Col span={4} ofsset={1} >
                                <RadioButton style={{background:"#808080"}} value={5}  />
                            </Col>  
                            <Col span={4} ofsset={1} >
                                <RadioButton style={{background:"#CD5C5C"}}  value={6} />
                            </Col>  
                        </RadioGroup>
                    </Row>
                  
                )}
    </FormItem>
    </Form>
}

export default InviteMeeting;