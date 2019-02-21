import React from 'react';
import { Form, Select, Input, Radio, Button } from 'antd';
import { TimeField, DateField } from '../../../../../../../../../components/FormCustomFields';
import { getMomentFromUTCTime, getMomentFromDate } from '../../../../../../../../../utils/datetime';
const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const FormItem = Form.Item;
const Option = Select.Option;


 
const FollowUpSnoozeForm = props => {
    const {form, followUp, user} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {dateTime} = followUp || {};
    return <Form style={{minWidth:200}} >

        <FormItem
            // {...formItemLayout}
            // label='Snooze for'
        >
            {getFieldDecorator('period', {
                    initialValue: 'week',
                }
            )(
                <Radio.Group buttonStyle="solid">
                <Radio.Button value="week">a Week</Radio.Button>
                <Radio.Button value="month">4 Weeks</Radio.Button>
                <Radio.Button value="date">Specific date</Radio.Button>
              </Radio.Group>
            )}
        </FormItem>

                {getFieldValue('period') == 'date' &&  <>
        <FormItem
            {...formItemLayout}
            label='Date'
        >
            {getFieldDecorator('date', {
                     initialValue: getMomentFromDate(dateTime),
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
                    initialValue: getMomentFromUTCTime(dateTime),
                    rules: [{required: true, message: "Select Time"}],
                }
            )(
                <TimeField />
            )}
        </FormItem>
               </> }
        <Button type="primary" ghost block onClick={props.onSubmit} >Snooze</Button>
    </Form>
}

export default FollowUpSnoozeForm;