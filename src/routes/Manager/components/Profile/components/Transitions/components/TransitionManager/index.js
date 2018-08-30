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
    const {form, transition={}, user} = props;
    const {getFieldDecorator} = form;
    const {type, date, time, details, source} = transition;
    return <Form>
        <FormItem
            {...formItemLayout}
            label="Transition Type"
        >
            {getFieldDecorator('type', {
                 initialValue: type,
                rules: [{
                    required: true,
                    message: "Please select Transition Type",
                }],
            })(
                <Select >
                    <Option value="hospitalization">Hospitalization</Option>
                    <Option value="discharge">Discharge</Option>
                    <Option value="surgery">Surgery</Option>
                    <Option value="admitted_er">Admitted to ER</Option>
                    <Option value="discharged_er">Discharged from ER</Option>
                    <Option value="died">Died</Option>
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
            label='Details'
        >
            {getFieldDecorator('details', {
                    initialValue: details,
                }
            )(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Source'
        >
            {getFieldDecorator('source', {
                    initialValue: source,
                }
            )(
                <Input />
            )}
        </FormItem>

        {/*<FormItem
            {...formItemLayout}
            label='Alert'
        >
         {getFieldDecorator('alert', {
        //initialValue: type,
        
        })(
            <TeamSelect user={user} />
        )}
           
    </FormItem>*/}
    </Form>
}

export default TransitionManager;