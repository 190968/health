import React from 'react';
import {Card,Select,Form,} from 'antd';
import moment from 'moment';
const Option = Select.Option;
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';


const CareManager = ({ form, formItemLayout,targetKeys,selectedKeys,handleChange,handleSelectChange}) => {
  

     const {getFieldDecorator} = form;
    // const {email='', gender='',fullName='',birthday='', phoneFormatted={},addressText={}, chemotherapies=[]} = patient;
    const children = [];
    return   <Form>
      <FormItem
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
          <p>You can send several invitations by pressing Enter after each.</p>
    </FormItem>
    </Form>
}

export default CareManager;