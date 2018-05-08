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
        names:PropTypes.shape({
            startDate: PropTypes.string,
            endDate: PropTypes.string
        }),
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        dateFormat: PropTypes.string,
        form: PropTypes.object.isRequired,
        endDateRequired: PropTypes.bool,
        inline: PropTypes.bool,
    }

    static defaultProps = {
        names: {
            startDate: 'startDate',
            endDate: 'endDate',
        },
        startDate: null,
        endDate: null,
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

        const start_date = form.getFieldValue(this.props.names.startDate);


        if (start_date && value && value < start_date) {

            callback('End date is wrong');
        } else {
            callback();
        }
    }

    disabledStartDate = (endValue) => {
        console.log(endValue);
        if (endValue) {
            const form = this.props.form;
            //callback();
            const startValue = form.getFieldValue(this.props.names.endDate);
            //const startValue = this.state.startValue;
            if (!endValue || !startValue) {
                return false;
            }
            return endValue.valueOf() > startValue.valueOf();
        }
        return false;
    }
    disabledEndDate = (endValue) => {
        if (endValue) {
            const form = this.props.form;
            //callback();


            const startValue = form.getFieldValue(this.props.names.startDate);
            //console.log(endValue);
            //console.log(startValue);
            //const startValue = this.state.startValue;
            if (!endValue || !startValue) {
                return false;
            }
            return endValue.valueOf() <= startValue.valueOf();
        }
    }


    render(){

        const {  form, intl, endDateRequired, startDate, endDate, inline, names } = this.props;
        let {formItemLayout} = this.props;

        const {getFieldDecorator} = form;

        if (inline) {
            formItemLayout = {};
        }
        //console.log(names);
        //console.log(startDate ? moment(startDate) : moment());

        const startField = <FormItem
            {...formItemLayout}
            label={!inline && 'Start Date'}
        >
            {getFieldDecorator(names.startDate, {
                initialValue: startDate ? moment(startDate) : moment(),
                rules: [{
                    type: 'object', required: true, message: 'Please Select',
                }],
            })(
                <DateField
                    allowClear={false}
                    placeholder="Start date"
                    disabledDate={this.disabledStartDate}
                />
            )}
        </FormItem>;


        const endfield =  <FormItem
            {...formItemLayout}
            label={!inline && 'End Date'}
        >
            {getFieldDecorator(names.endDate, {
                initialValue: endDate ? moment(endDate) : undefined,
                rules: [{
                    type: 'object', required: endDateRequired, validator: this.checkEndDate, message: 'End date must be after Start Date',
                }],
            })(

                <DateField
                    placeholder="End date"
                    allowClear={!endDateRequired}
                    disabledDate={this.disabledEndDate}
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

export const StartEndForm = injectIntl(StartEndFormInit);





class DateFieldInit extends React.Component{

    constructor(props) {
        super(props);

        const value = this.props.value || undefined;
        //console.log(props);
        this.state = {
            date: value
        };
    }

    static propTypes = {
        disabledDate: PropTypes.func,
        allowClear: PropTypes.bool,
        dateFormat: PropTypes.string,
        placeholder: PropTypes.string,
    }

    static defaultProps = {
        allowClear: true,
        placeholder: 'Select Date',
        disabledDate: () => {
            return false;
        },
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

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        // Should be a controlled component.
        if ('value' in nextProps) {
            const date = nextProps.value || undefined;
            this.setState({date});
        }
    }

    onChange = (date) => {
        //console.log(date);

        if (!('value' in this.props)) {
            this.setState({ date });
        }
        this.triggerChange({ date });
    }

    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            //console.log(Object.assign({}, this.state, changedValue.date));
            const formattedDate = changedValue.date;
            //const formattedDate = moment(date).format('YYYY-MM-DD');
            //console.log(this.state);
            //console.log(Object.assign({}, this.state, changedValue));
            onChange(formattedDate);
            //const newValue = Object.assign({}, this.state, changedValue);
            this.setState(changedValue);
            //onChange(Object.assign({}, this.state, changedValue));
        }
    }

    render(){

        const {disabledDate, placeholder, dateFormat, allowClear } = this.props;
        //console.log(this.state);
        return <DatePicker
             placeholder={placeholder}
             format={dateFormat}
             disabledDate={disabledDate}
             allowClear={allowClear}
             onChange={this.onChange}
             value={this.state.date}
         />
    }
}


export const DateField = connect(
    mapStateToProps,
    mapDispatchToProps
)(DateFieldInit);

