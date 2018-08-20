import React from 'react';
import { Radio, Form } from 'antd';
const RadioGroup = Radio.Group;
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
const RadioForm = ({ form, label, options }, props) => {
    const { getFieldDecorator } = form;
    const opt = [];

    options.map((data) => { opt.push(<Radio value={data.label} key={data.id} >{data.label}</Radio>) })
    console.log(opt, props);
    return (
 
                <RadioGroup >
                    {opt}
                </RadioGroup>
    );
}
export default RadioForm;