
import React from 'react';
import {Select,Form, Input} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

const InviteFormModal = props => {
  
const {form,selectedObj,formItemLayout} = props;
     const {getFieldDecorator} = form;  
     let defVal,options;
    if(selectedObj[0].fullName){
        defVal = selectedObj.map(obj =>obj.fullName);
        options = selectedObj.map(obj => <Option key={obj.fullName} value={obj.fullName}>{obj.fullName}</Option>)
    } else {
        defVal = selectedObj.map(obj =>obj.user.fullName);
        options = selectedObj.map(obj => <Option key={obj.user.fullName} value={obj.user.fullName}>{obj.user.fullName}</Option>)
    }
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
                   {
                      options
                  }
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