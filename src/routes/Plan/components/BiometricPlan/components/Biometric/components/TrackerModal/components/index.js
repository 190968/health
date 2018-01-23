/**
 * Created by Pavel on 21.12.2017.
 */
import React, { PropTypes } from 'react';
import {Modal, DatePicker, Form ,Spin, Col,Select,Input, Checkbox } from 'antd';
import moment from "moment/moment";
import Tracker from '../../../../../../Tracker';
import {
    FormattedMessage,
} from 'react-intl';
const { Option } = Select;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;


class EditTrackerForm extends React.Component {
    constructor(props) {
        super(props);

        this.checkEndDate = this.checkEndDate.bind(this);
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

                // prepare fields here
                //{"details":{ "purpose":"","timesPerDay":"2","quantity":"1.25","takeAt00":"2018-01-11T21:00:00.000Z","quantityTake0":1,"takeAt01":"2018-01-11T21:00:00.000Z"}}.
                //console.log(onCancel);
                return updateTracker(input);
            }
        });

    }

    render() {
        const { loading, columns, info } = this.props;
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


        let timesToReport = info.timesToReport;
        timesToReport = timesToReport > 0 ? timesToReport : 1;

        const startDate = info.startDate
            const endDate = info.endDate;
        const dateFormat = 'YYYY-MM-DD';

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
                    label="Critical Range"
                >
                    {getFieldDecorator('criticalRangeMin', {
                        initialValue: info.criticalRange.min
                    })(
                            <Col offset={1} span={10}>
                                <Col span={8}> below </Col><Col span={14}><Tracker item={info.measurement} /></Col>
                            </Col>

                    )}
                    {getFieldDecorator('criticalRangeMax', {
                        initialValue: info.criticalRange.max
                    })(
                        <Col offset={1} span={10}>
                            <Col  span={8}> above </Col><Col span={14}><Tracker item={info.measurement} /></Col>
                        </Col>

                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Normal Range"
                >
                    {getFieldDecorator('normalRangeMin', {
                        initialValue: info.normalRange.min
                    })(
                        <Col offset={1} span={10}>
                            <Col span={8}> below </Col><Col span={14}><Tracker item={info.measurement} /></Col>
                        </Col>

                    )}
                    {getFieldDecorator('normalRangeMax', {
                        initialValue: info.normalRange.max
                    })(
                        <Col offset={1} span={10}>
                            <Col  span={8}> above </Col><Col span={14}><Tracker item={info.measurement} /></Col>
                        </Col>

                    )}
                </FormItem>
                {/*<FormItem
                    {...formItemLayout}
                    label="Attach Diagnoses"
                >
                    {getFieldDecorator('attachDiagnoses', {

                    })(
                        <Col offset={1} span={10}>
                            <Select defaultValue="lucy" style={{ width: 300 }}>
                                <Option value="lucy">Select ICD-10 code</Option>
                            </Select>
                        </Col>

                    )}

                </FormItem>*/}

                {columns.length > 0 && <FormItem
                    {...formItemLayout}
                    label="Columns"
                >
                    {getFieldDecorator('columns', {
                        initialValue: info.columns
                    })(
                    <CheckboxGroup options={columns.map((column) => {
                        return { label: column.name, value: column.id };
                    })} /*defaultValue={['Apple']} onChange={onChange}*/ />
                    )}

                </FormItem>}
                <FormItem
                    {...formItemLayout}
                    label="# of Reports"
                >
                    {getFieldDecorator('timesToReport', {
                        initialValue: timesToReport,
                        rules: [{
                            required: true, message: 'Please Select',
                        }],
                    })(
                            <Select style={{ width: 120 }}>
                                <Option value={1}>1 Time</Option>
                                <Option value={2}>2 Times</Option>
                                <Option value={3}>3 Times</Option>
                                <Option value={4}>4 Times</Option>
                                <Option value={5}>5 Times</Option>
                                <Option value={6}>6 Times</Option>
                                <Option value={7}>7 Times</Option>
                                <Option value={8}>8 Times</Option>
                                <Option value={9}>9 Times</Option>
                            </Select>

                    )}

                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage id="biometric.period" defaultMessage="Period" description="Period"/>}
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
                    label="Graph"
                >
                    {getFieldDecorator('graph', {
                        initialValue: info.measurement.graph
                    })(
                            <Select style={{ width: 120 }}>
                                <Option value={1}>Area</Option>
                                <Option value={0}>Line</Option>
                                <Option value={2}>Bar</Option>
                            </Select>

                    )}

                </FormItem>
            </Form>
            </Modal>
        );
    }
}

const WrappedEditTrackerForm = Form.create()(EditTrackerForm);
export default WrappedEditTrackerForm;
