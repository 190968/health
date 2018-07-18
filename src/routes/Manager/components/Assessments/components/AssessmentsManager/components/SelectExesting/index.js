import React from 'react';
import {Input, Select, Form,} from 'antd';
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
const Option = Select.Option;
const SelectExesting = props => {
    const {getFieldDecorator} = props.form;
    const {edges} = props;
    console.log(props);
    return <Form>
        <FormItem
        {...formItemLayout}
            label="Select a Provider"
        >
                   {getFieldDecorator('type', {})(
                       <Select
                       placeholder={"Start typing gere"}
                           style={{width: '100%'}}
                       >
                                {edges.map(edge => <Option key={edge.id} value={edge.name}>{edge.name}</Option>)}
                       </Select>
                   )}
        </FormItem>
        
    </Form>
}

export default SelectExesting;