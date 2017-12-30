/**
 * Created by Pavel on 21.12.2017.
 */
import React, { PropTypes } from 'react';
import {
    FormattedMessage,
} from 'react-intl';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {Modal, Form ,List,Radio,Row, Col,Select,Input, DatePicker , Button } from 'antd';
const { Option, OptGroup } = Select;
const FormItem = Form.Item;

class EditTrackerForm extends React.Component {



    render() {
        const { getFieldDecorator } = this.props.form;
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
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="Critical Range"
                >
                    {getFieldDecorator('criticalRangeMin', {

                    })(
                            <Col offset={2} span={10}>
                                <Col span={8}> below </Col><Col span={14}><Input /></Col>
                            </Col>

                    )}
                    {getFieldDecorator('criticalRangeMax', {

                    })(
                        <Col offset={1} span={10}>
                            <Col  span={8}> above </Col><Col span={14}><Input /></Col>
                        </Col>

                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Normal Range"
                >
                    {getFieldDecorator('normalRangeMin', {

                    })(
                        <Col offset={2} span={10}>
                            <Col span={8}> below </Col><Col span={14}><Input /></Col>
                        </Col>

                    )}
                    {getFieldDecorator('normalRangeMax', {

                    })(
                        <Col offset={1} span={10}>
                            <Col  span={8}> above </Col><Col span={14}><Input /></Col>
                        </Col>

                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Attach Diagnoses"
                >
                    {getFieldDecorator('attachDiagnoses', {

                    })(
                        <Col span={24}>
                            <Select defaultValue="lucy" style={{ width: 300 }}>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </Col>

                    )}

                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="# of Reports"
                >
                    {getFieldDecorator('ofReports', {

                    })(
                        <Col span={24}>
                            <Select defaultValue="lucy" style={{ width: 120 }}>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </Col>

                    )}

                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Graph"
                >
                    {getFieldDecorator('graph', {

                    })(
                        <Col span={24}>
                            <Select defaultValue="lucy" style={{ width: 120 }}>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </Col>

                    )}

                </FormItem>
            </Form>

        );
    }
}

const WrappedEditTrackerForm = Form.create()(EditTrackerForm);
export default WrappedEditTrackerForm;
