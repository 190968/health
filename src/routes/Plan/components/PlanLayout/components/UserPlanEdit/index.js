/**
 * Created by Pavel on 21.12.2017.
 */
import React, { PropTypes } from 'react';
import {Modal, DatePicker, Form ,Spin, Col,Select,Input, Checkbox } from 'antd';
import moment from "moment/moment";
const { Option } = Select;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;


const formItemLayout = {
    labelCol: {
        xs: { span: 20 },
        sm: { span: 6 },

    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

class UserPlanEditForm extends React.Component {
    constructor(props) {
        super(props);

        this.checkEndDate = this.checkEndDate.bind(this);
    };

    checkEndDate = (rule, value, callback) => {
        const form = this.props.form;
        //callback();
        //  console.log(value);
        const start_date = form.getFieldValue('startDate');
        //console.log(start_date);
        //console.log(value);
        if (start_date && value && value < start_date) {
            //console.log(callback);
            callback('End date is wrong');
        } else {
            callback();
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { amid, updateTracker } = this.props;
        //console.log(this.props);
        this.props.form.validateFields((err, values) => {
            //console.log(values);
            if (!err) {
                const{criticalRangeMin, criticalRangeMax, normalRangeMin, normalRangeMax, attachDiagnoses, timesToReport, graph, columns, startDate, endDate } = values;

                //console.log(columns);
                const startDateYMD = startDate.format("YYYY-MM-DD");
                const endDateYMD = endDate ? endDate.format("YYYY-MM-DD") : '';
                const input = {
                    amid:amid,
                    graph:graph,
                    timesToReport:timesToReport,
                    criticalRange: {min:criticalRangeMin, max:criticalRangeMax},
                    normalRange: {min:normalRangeMin, max:normalRangeMax},
                    columns: columns,
                    icd10Codes: attachDiagnoses,
                    startDate: startDateYMD,
                    endDate: endDateYMD,
                }

            //console.log(id);
            //console.log(userId);
                console.log(input);

                // prepare fields here
                //{"details":{ "purpose":"","timesPerDay":"2","quantity":"1.25","takeAt00":"2018-01-11T21:00:00.000Z","quantityTake0":1,"takeAt01":"2018-01-11T21:00:00.000Z"}}.
                //console.log(onCancel);
                return updateTracker(input);
            }
        });

    }

    render() {
        const { loading, plan, info } = this.props;
        const { getFieldDecorator } = this.props.form;

        if (loading) {
            return   <Modal
                visible={true}
                closable={false}
                destroyOnClose
                footer={false}
                bodyStyle={{height:150, textAlign:'center', lineHeight:5}}
            >
                <Spin tip="Loading..." />
            </Modal>
        }

        const {startDate, endDate, privacy, dateFormat} = info


        return (
            <Modal
                visible={true}
                destroyOnClose
                maskClosable = {false}
                keyboard = {false}
                okText="Save"
                onCancel={this.props.onCancel}
                title={this.props.title+' '+info.measurement.label}
                onOk={this.handleSubmit}
            >
            <Form>
                <FormItem
                    {...formItemLayout}
                    label={'Period'}
                >
                    <Col span={11}>
                        <FormItem
                        >
                            {getFieldDecorator('startDate', {
                                initialValue: startDate ? moment(startDate) : moment(),
                                rules: [{
                                    required: true, message: 'Please Select Start Date',
                                }],
                            })(
                                <DatePicker
                                    /*disabledDate={this.disabledStartDate}
                                    format={dateFormat}*/
                                    placeholder="Start date"
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={2}>
                    <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
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
                                    /*disabledDate={this.disabledEndDate}
                                    format={dateFormat}
                                    placeholder="End"*/
                                />
                            )}
                        </FormItem>
                    </Col>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Privacy"
                >
                    {getFieldDecorator('graph', {
                        initialValue: info.privacy
                    })(
                            <Select style={{ width: 120 }}>
                                <Option value="area">Area</Option>
                                <Option value="line">Line</Option>
                                <Option value="bar">Bar</Option>
                            </Select>

                    )}

                </FormItem>
            </Form>
            </Modal>
        );
    }
}

const WrappedUserPlanEditFormForm = Form.create()(UserPlanEditForm);
export default WrappedUserPlanEditFormForm;
