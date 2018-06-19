import React from 'react';
import {Card,Select,Form,} from 'antd';
import moment from 'moment';
const Option = Select.Option;
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';


const AnalystsManager = ({ form, formItemLayout,targetKeys,selectedKeys,handleChange,handleSelectChange}) => {
  

     const {getFieldDecorator} = form;
    // const {email='', gender='',fullName='',birthday='', phoneFormatted={},addressText={}, chemotherapies=[]} = patient;
    const children = [];
    return   <Form>
    <FormItem
        // {...formItemLayout}
        label="Enter in the email address of who you would like to invite to Fitango Demo"
    >
                {getFieldDecorator('email', {
                })(
                    <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    tokenSeparators={[',']}
                  >
                  </Select>
                  
                )}
          <label>You can send multiple invites by using a comma between each email address.</label>
    </FormItem>
    </Form>
}

export default AnalystsManager;