/**
 * Created by Pavel on 21.12.2017.
 */
import React, { PropTypes } from 'react';
import {Modal, DatePicker, Form ,Spin, Col, Radio, Popover } from 'antd';
import moment from "moment/moment";
import {message} from "antd/lib/index";
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


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
        this.state = {confirmLoading:false}
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
        const { updateUserPlan, onCancel } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const{privacy, startDate, endDate } = values;

                const startDateYMD = startDate.format("YYYY-MM-DD");
                const endDateYMD = endDate ? endDate.format("YYYY-MM-DD") : '';
                const input = {
                    privacy,
                    startDate:startDateYMD,
                    endDate:endDateYMD
                }

                this.setState({confirmLoading:true});

                return updateUserPlan(input).then((data) => {
                    //message.success('Saved');
                    this.setState({confirmLoading:false});
                    onCancel();
                })
            }
        });

    }

    render() {
        const { loading, plan, info, dateFormat } = this.props;
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

        const {startDate, endDate, privacy} = info


        return (
            <Modal
                visible={true}
                destroyOnClose
                maskClosable = {false}
                keyboard = {false}
                okText="Save"
                onCancel={this.props.onCancel}
                title={this.props.title}
                confirmLoading={this.state.confirmLoading}
                onOk={this.handleSubmit}
            >
            <Form>

                {!plan.isFixedDated ?
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
                                    /*disabledDate={this.disabledStartDate}*/
                                    format={dateFormat}
                                    placeholder="Start date"
                                    allowClear={false}
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
                                initialValue: endDate ? moment(endDate) : undefined,
                                rules: [{
                                    validator: this.checkEndDate, message: 'End date must be after Start Date',
                                }],
                            })(
                                <DatePicker
                                    placeholder="End date"
                                    format={dateFormat}

                                    /*disabledDate={this.disabledEndDate}

                                    placeholder="End"*/
                                />
                            )}
                        </FormItem>
                    </Col>
                </FormItem>
                    :
                <div>sssss</div>
                }
                <FormItem
                    {...formItemLayout}
                    label="Privacy"
                >
                    {getFieldDecorator('privacy', {
                        initialValue: info.privacy,
                        rules: [{
                            required: true, message: 'Please Select',
                        }],
                    })(
                        <RadioGroup>
                            <Popover content="Visible to anyone">
                                <RadioButton value="open">Open
                                </RadioButton>
                            </Popover>
                            <Popover content="Visible to you">
                                <RadioButton value="private">Private</RadioButton>
                            </Popover>
                        </RadioGroup>
                    )}

                </FormItem>
            </Form>
            </Modal>
        );
    }
}

const WrappedUserPlanEditFormForm = Form.create()(UserPlanEditForm);
export default WrappedUserPlanEditFormForm;
