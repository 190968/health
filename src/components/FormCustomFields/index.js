import React from 'react';
import PropTypes from 'prop-types';

import { DatePicker, Input,Col,Select,Form } from 'antd';
import {
    injectIntl,
    defineMessages,
    FormattedMessage
} from 'react-intl';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import moment from "moment/moment";
import {connect} from "react-redux";

const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;

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


export class StartEndFormInit extends React.Component{


    static propTypes = {
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        dateFormat: PropTypes.string,
        form: PropTypes.object.isRequired,
        endDateRequired: PropTypes.bool,
        inline: PropTypes.bool,
    }

    static defaultProps = {
        startDate: '',
        endDate: '',
        endDateRequired: false,
        inline: true,
        formItemLayout: {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        }
    }


    checkEndDate = (rule, value, callback) => {
        const form = this.props.form;
        //callback();

        const start_date = form.getFieldValue('startDate');


        if (start_date && value && value < start_date) {

            callback('End date is wrong');
        } else {
            callback();
        }
    }

    disabledStartDate = (endValue) => {
        const form = this.props.form;
        //callback();

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

        const startValue = form.getFieldValue('startDate');
        //const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }


    render(){

        const {  form, intl, endDateRequired, startDate, endDate, dateFormat, inline } = this.props;
        let {formItemLayout} = this.props;

        const {getFieldDecorator} = form;

        if (inline) {
            formItemLayout = {};
        }


        const startField = <FormItem
            {...formItemLayout}
            label={!inline && 'Start Date'}
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
        </FormItem>;


        const endfield =  <FormItem
            {...formItemLayout}
            label={!inline && 'End Date'}
        >
            {getFieldDecorator('endDate', {
                initialValue: endDate ? moment(endDate, dateFormat) : undefined,
                rules: [{
                    required: endDateRequired, validator: this.checkEndDate, message: 'End date must be after Start Date',
                }],
            })(
                <DatePicker
                    placeholder="End date"
                    format={dateFormat}
                    disabledDate={this.disabledEndDate}
                    allowClear={!endDateRequired}
                />
            )}
        </FormItem>;


        if (inline) {
            // if it's inline
            return (
                <React.Fragment>
                    <Col span={11}>
                        {startField}

                    </Col>
                    <Col span={2}>
                    <span style={{display: 'inline-block', width: '100%', textAlign: 'center'}}>
                      -
                    </span>
                    </Col>
                    <Col span={11}>
                        {endfield}

                    </Col>
                </React.Fragment>
            );
        } else {
            // in as separate field
            return (
                <React.Fragment>
                        {startField}

                        {endfield}
                </React.Fragment>
            );
        }
    }

}


const mapStateToProps = (state) => {
    return {
        dateFormat: state.user.info.dateFormat
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
});






export const StartEndForm = injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(StartEndFormInit));
