import React, { PropTypes } from 'react';

import { DatePicker, Input,Col,Select,Form } from 'antd';
import {
    injectIntl,
    defineMessages,
    FormattedMessage
} from 'react-intl';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import moment from "moment/moment";

const InputGroup = Input.Group;
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
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    },
};


export class StartEndForm extends React.Component{

    constructor(props){
        super(props);
    }

    static defaultProps = {
        startDate: '',
        endDate: '',
    }


    disabledStartDate = (endValue) => {
        const form = this.props.form;
        //callback();
        //  console.log(value);
        const startValue = form.getFieldValue('endDate');
        //const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() > startValue.valueOf();
    }
    disabledEndDate = (endValue) => {
        const form = this.props.form;
        //callback();
        //  console.log(value);
        const startValue = form.getFieldValue('startDate');
        //const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }


    render(){
        //console.log(this.props);
        const {  intl, prefix, countries,  getFieldDecorator, startDate, endDate, dateFormat } = this.props;


        return (
                <React.Fragment>
                    <Col span={11}>
                        <FormItem
                        >
                            {getFieldDecorator('startDate', {
                                initialValue: startDate ? moment(startDate) : moment(),
                                rules: [{
                                    required: true, message: 'Please Select',
                                }],
                            })(
                                <DatePicker
                                    disabledDate={this.disabledStartDate}
                                    allowClear={false}
                                    format={dateFormat}
                                    placeholder="Start date"
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={2}>
                    <span style={{display: 'inline-block', width: '100%', textAlign: 'center'}}>
                      -
                    </span>
                    </Col>
                    <Col span={11}>
                        <FormItem
                        >
                            {getFieldDecorator('endDate', {
                                initialValue: endDate ? moment(endDate, dateFormat) : undefined,
                                rules: [{
                                    validator: this.checkEndDate, message: 'End date must be after Start Date',
                                }],
                            })(
                                <DatePicker
                                    placeholder="End date"
                                    format={dateFormat}
                                    disabledDate={this.disabledEndDate}
                                />
                            )}
                        </FormItem>
                    </Col>
                </React.Fragment>
        );
    }

}
 
export default injectIntl(StartEndForm);
