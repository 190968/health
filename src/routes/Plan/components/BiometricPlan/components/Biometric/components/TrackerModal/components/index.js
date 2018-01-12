/**
 * Created by Pavel on 21.12.2017.
 */
import React, { PropTypes } from 'react';
import {
    FormattedMessage,
} from 'react-intl';
import {Modal, Form ,Spin, Col,Select,Input, Checkbox , Button } from 'antd';
const { Option, OptGroup } = Select;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

class EditTrackerForm extends React.Component {



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
                title={this.props.title}
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
                            <Col offset={2} span={10}>
                                <Col span={8}> below </Col><Col span={14}><Input /></Col>
                            </Col>

                    )}
                    {getFieldDecorator('criticalRangeMax', {
                        initialValue: info.criticalRange.max
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
                        initialValue: info.normalRange.min
                    })(
                        <Col offset={2} span={10}>
                            <Col span={8}> below </Col><Col span={14}><Input /></Col>
                        </Col>

                    )}
                    {getFieldDecorator('normalRangeMax', {
                        initialValue: info.normalRange.max
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
                        <Col offset={2} span={10}>
                            <Select defaultValue="lucy" style={{ width: 300 }}>
                                <Option value="lucy">Select ICD-10 code</Option>
                            </Select>
                        </Col>

                    )}

                </FormItem>

                {columns.length > 0 && <FormItem
                    {...formItemLayout}
                    label="Columns"
                >
                    <CheckboxGroup options={columns.map((column) => {
                        return { label: column.name, value: column.id };
                    })} /*defaultValue={['Apple']} onChange={onChange}*/ />

                </FormItem>}
                <FormItem
                    {...formItemLayout}
                    label="# of Reports"
                >
                    {getFieldDecorator('ofReports', {
                        initialValue: info.normalRange.timesToReport
                    })(
                        <Col span={24}>
                            <Select defaultValue={1} style={{ width: 120 }}>
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
                        </Col>

                    )}

                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Graph"
                >
                    {getFieldDecorator('graph', {
                        initialValue: 1
                    })(
                        <Col span={24}>
                            <Select style={{ width: 120 }}>
                                <Option value={1}>Area</Option>
                                <Option value={0}>Line</Option>
                                <Option value={2}>Bar</Option>
                            </Select>
                        </Col>

                    )}

                </FormItem>
            </Form>
            </Modal>
        );
    }
}

const WrappedEditTrackerForm = Form.create()(EditTrackerForm);
export default WrappedEditTrackerForm;
