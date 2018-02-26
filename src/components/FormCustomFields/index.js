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


export class StartEndFormInit extends React.Component{

    constructor(props){
        super(props);
    }

    static propTypes = {
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        dateFormat: PropTypes.string,
        form: PropTypes.object.isRequired,
        endDateRequired: PropTypes.bool,
    }

    static defaultProps = {
        startDate: '',
        endDate: '',
        endDateRequired: false,
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

        const {  form, intl, endDateRequired, startDate, endDate, dateFormat } = this.props;

        const {getFieldDecorator} = form;

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
                        </FormItem>
                    </Col>
                </React.Fragment>
        );
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
