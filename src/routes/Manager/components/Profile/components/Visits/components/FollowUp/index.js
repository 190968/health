import React from 'react';
import { Form, Select, Input, Radio, Checkbox } from 'antd';
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
    const {getFieldDecorator, getFieldValue} = form;
    const {type, date, time, details, source} = visit;
    return <Form>

    {/* <FormItem
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
        </FormItem> */}

        <FormItem
            {...formItemLayout}
            label='Date'
        >
            {getFieldDecorator('date', {
                     initialValue: date,
                    rules: [{required: true, message: "Select Date"}],
                }
            )(
                <DateField disabledDate={props.disabledDate} />
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
            {getFieldDecorator('subject', {
                    //initialValue: details,
                    rules: [{required: true, message: "Enter Subject"}],
                }
            )(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Notes'
        >
            {getFieldDecorator('notes', {
                    //initialValue: details,
                }
            )(
                <Input.TextArea />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Visible'
        >
            {getFieldDecorator('privacy', {
                    //initialValue: details,
                }
            )(
                <Radio.Group  buttonStyle="solid">
                <Radio.Button value="personal">Only me</Radio.Button>
                <Radio.Button value="team">Patient's Team</Radio.Button>
              </Radio.Group>
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Important'
        >
            {getFieldDecorator('isImportant', {
                    //initialValue: details,
                }
            )(
                <Checkbox />
            )}
        </FormItem>
    </Form>
}

export default TransitionManager;