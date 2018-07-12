
import React from 'react';
import {Select,Form, Input} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

const InviteFormModal = props => {
  
const {form,selectedObj,formItemLayout} = props;
     const {getFieldDecorator} = form;  
     let defVal = selectedObj.map(obj =>obj.user.fullName);
    return   <Form>
          <FormItem
            {...formItemLayout}
            label="Participants to invite"
          >
                     <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            defaultValue={defVal}
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

export default InviteFormModal;