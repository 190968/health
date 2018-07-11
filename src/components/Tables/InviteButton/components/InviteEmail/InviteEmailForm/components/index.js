
import React from 'react';
import {Select,Form, Input} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

const InviteFormModal = props => {
  
const {form,selectedObj} = props;
     const {getFieldDecorator} = form;  

    return   <Form>
          <FormItem >
                     <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            defaultValue={selectedObj}
                        >
                            {selectedObj.map(obj => <Option key={obj} value={obj}>{obj}</Option>)}
            </Select>
    </FormItem>
    <FormItem
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