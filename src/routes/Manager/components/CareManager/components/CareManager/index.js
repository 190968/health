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
        {...formItemLayout}
        label="Email"
        required
    >
                {getFieldDecorator('email', {
                })(
                    <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    tokenSeparators={[',']}
                  >
                    {children}
                  </Select>
                )}
          
    </FormItem>
    </Form>
}

export default CareManager;