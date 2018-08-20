import React from 'react';
import { Menu, Select, Form } from 'antd';
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
const DropdownForm = ({ form, label, options }, props) => {
    const { getFieldDecorator } = form;
    const opt = [];

    options.map((data) => { opt.push(<Option value={data.label} key={data.id}>{data.label}</Option>) })
    console.log(opt, props);
    return (

        
                <Select >
                    {opt}
                </Select>
    );
}
export default DropdownForm;