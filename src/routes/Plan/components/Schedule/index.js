import React from 'react';
import {Form, Radio} from 'antd';
import { DateField } from '../../../../components/FormCustomFields';
import moment from 'moment';

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

const PlanSchedule = props => {
    const { form, checkStartDate, checkEndDate, formItemLayout=formItemLayoutDefault, startDate, endDate } = props;
    const {getFieldDecorator, getFieldValue} = form || {}; 
    let endDateError = form.getFieldError('endDate');
    endDateError = endDateError || form.getFieldError('end_date_set');

    return <React.Fragment>
        <FormItem
            {...formItemLayout}
            label="Start Date"
        >
            {getFieldDecorator('startDate', {
                initialValue: startDate ? moment(startDate) : moment(),
                rules: [{
                    required: true, message: 'Please Select Start Date',
                }],
            })(
                <DateField disabledDate={checkStartDate} allowClear={false} />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label="End Date"
            validateStatus={endDateError ? 'error' : ''}
            help={endDateError || ''}
        >
            {getFieldDecorator('end_date_set', {
                rules: [{
                    required: true, message: 'Please Select End Date',
                }],
            })(
                <RadioGroup style={{marginTop:5}}>
                    <Radio style={radioStyle} value={false}>Never</Radio>
                    <Radio style={radioStyle} value={true}>
                        On  {getFieldValue('end_date_set') === true &&

                            getFieldDecorator('endDate', {
                                initialValue: endDate ? moment(endDate) : undefined,
                                rules: [{ required: true, message: 'Select End Date' }, {
                                    validator: props.validateEndDate,
                                    message: 'End date must be after Start Date',
                                }],
                            })(
                                <DateField disabledDate={checkEndDate} style={{ marginLeft: 10 }} />
                            )}
                    </Radio>
                </RadioGroup>
            )}
        </FormItem>
    </React.Fragment>
}

export default PlanSchedule;