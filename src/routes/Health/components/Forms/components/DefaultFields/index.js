import React from 'react';
import {Form, Input} from 'antd';
import moment from 'moment';
import {DateField} from "../../../../../../components/FormCustomFields/index";
 
const FormItem = Form.Item;
const formItemLayoutDefault = {
    labelCol: {span: 7},
    wrapperCol: {span: 17},
};


const DefaultHealthFields = (props) => {
    const {form, formItemLayout=formItemLayoutDefault, healthRecord, user, hideHealthData=false} = props;
    const {getFieldDecorator} = form;
    if (hideHealthData && !user) {
        // if that's from treatment - no need for date
        return null;
    }
    const {notes, date} = healthRecord || {};
    return <React.Fragment>
        <FormItem
            {...formItemLayout}
            label='Date of Onset'
        >
            {getFieldDecorator('date', {
                    initialValue: date ? moment(date) : undefined,
                    rules: [{required: true, message: "Select Date of Onset"}],
                }
            )(
                <DateField />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label='Notes'
        >
            {getFieldDecorator('notes',{
                initialValue: notes
                }
            )(
                <Input.TextArea  />
            )}
        </FormItem>
    </React.Fragment>
}

export default DefaultHealthFields;