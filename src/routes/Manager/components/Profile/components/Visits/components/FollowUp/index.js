import React from 'react';
import { Form, Select, Input, Radio } from 'antd';
import { DateField, TimeField } from '../../../../../../../../components/FormCustomFields';
import { TeamSelect } from '../../../../../../../../components/Autosuggest/containers/TeamSelect';
const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const FormItem = Form.Item;
const Option = Select.Option;


 
const TransitionManager = props => {
    const {form, visit={}, user} = props;
    const {getFieldDecorator} = form;
    const {type, date, time, details, source} = visit;
    return <Form>

 <FormItem
            {...formItemLayout}
            label="Type"
        >
            {getFieldDecorator('type', {
                 initialValue: type,
                rules: [{
                    required: true,
                    message: "Please select Type",
                }],
            })(
                <Select>
                    <Option value="in_person">In Person</Option>
                    <Option value="phone">Phone call</Option>
                    <Option value="video">Video</Option>
                </Select>
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Date'
        >
            {getFieldDecorator('date', {
                     initialValue: date,
                    rules: [{required: true, message: "Select Date"}],
                }
            )(
                <DateField />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Time'
        >
            {getFieldDecorator('time', {
                     initialValue: time,
                    rules: [{required: true, message: "Select Time"}],
                }
            )(
                <TimeField />
            )}
        </FormItem>


        <FormItem
            {...formItemLayout}
            label='Subject'
        >
            {getFieldDecorator('subjective', {
                    //initialValue: details,
                }
            )(
                <Input />
            )}
        </FormItem>
    </Form>
}

export default TransitionManager;