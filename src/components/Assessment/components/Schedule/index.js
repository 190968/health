import React from 'react';
import {Form, Radio, Select} from 'antd';
import moment from 'moment';
import { DateField, TimeField } from '../../../FormCustomFields';
import { formatTimeForField } from '../../../Other/utils';
import { prepareDateForForm } from '../../../../utils/datetime';

const formItemLayoutDefault = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 6},

    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '33px',
};


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const DOWS = [
    {name:'sun', value:'Sun'},
    {name:'mon', value:'Mon'},
    {name:'tue', value:'Tue'},
    {name:'wed', value:'Wed'},
    {name:'thu', value:'Thu'},
    {name:'fri', value:'Fri'},
    {name:'ast', value:'Sat'},
]

const AssessmentSchedule = props => {
    const { form, checkStartDate, checkEndDate, formItemLayout=formItemLayoutDefault, startDate:startDateInitial, endDate:endDateInitial, schedule } = props;
    const {getFieldDecorator, getFieldValue} = form || {}; 
    let endDateError = form.getFieldError('endDate');
    endDateError = endDateError || form.getFieldError('end_date_set');
    const {startDate=startDateInitial, endDate=endDateInitial, dows, startTime} = schedule || {};

    let repeating = undefined;
    if (dows) {
        repeating = 'dows';
    }

    return <React.Fragment>
        <FormItem
            {...formItemLayout}
            label="Start Date"
        >
            {getFieldDecorator('startDate', {
                initialValue: prepareDateForForm(startDate, true),
                rules: [{
                    required: true, message: 'Please Select Start Date',
                }],
            })(
                <DateField disabledDate={checkStartDate} allowClear={false} />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label="Repeating"
        >
            {getFieldDecorator('repeating', {
                initialValue: repeating,
                rules: [{
                    required: true, message: 'Please Select Repeating',
                }],
            })(
                <RadioGroup>
                    <Radio style={radioStyle} value={'onetime'}>One time</Radio>
                    <Radio style={radioStyle} value={'everyday'}>Every Day</Radio>
                    <Radio style={radioStyle} value={'dows'}>On Selected Days</Radio>
                </RadioGroup>
            )}
        </FormItem>

        {getFieldValue('repeating') === 'dows' &&  <FormItem
            {...formItemLayout}
            label="Repeating"
        >
            {getFieldDecorator('dows', {
                initialValue: dows,
                rules: [{
                    required: true, message: 'Please Select Days',
                }],
            })(
                <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select Days"
            >
                {DOWS.map(info => <Option key={info.name}>{info.value}</Option>)}
            </Select>
            )}
        </FormItem>}

         {getFieldValue('repeating') === 'everyday' &&  <FormItem
            {...formItemLayout}
            label="End Date"
            validateStatus={endDateError ? 'error' : ''}
            help={endDateError || ''}
        >
            {getFieldDecorator('endDate', {
                                initialValue: prepareDateForForm(endDate),
                                rules: [{
                                    validator: props.validateEndDate,
                                    message: 'End date must be after Start Date',
                                }],
                            })(
                                <DateField disabledDate={checkEndDate} style={{ marginLeft: 10 }} />
            )}
        </FormItem>}
        
        <FormItem
            {...formItemLayout}
            label="Time"
        >
            {getFieldDecorator('startTime', {
                initialValue: startTime ? formatTimeForField(startTime) : undefined,
            })(
                <TimeField />
            )}
        </FormItem>
    </React.Fragment>
}

export default AssessmentSchedule;