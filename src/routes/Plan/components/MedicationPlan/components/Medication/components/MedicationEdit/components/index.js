/**
 * Created by Pavel on 21.12.2017.
 */
import React, { PropTypes } from 'react';
import {
    FormattedMessage,
} from 'react-intl';
import { Link } from 'react-router-dom'
import moment from 'moment';
import {Modal, Form ,List,Radio,Row, Col,Select,Input, DatePicker , Button } from 'antd';
const { Option, OptGroup } = Select;
const FormItem = Form.Item;

const RadioGroup = Radio.Group;

class EditMedicationForm extends React.Component {

    constructor(props) {
        super(props);
    };


    componentWillReceiveProps = (nextProps) => {
        console.log(nextProps);
        this.state = {
            value: nextProps.info.medication.type,
            advance: false,
            value_select: 1,
            total: 0,
            startValue: nextProps.info.medication.startDate,
            endValue: nextProps.info.medication.endDate,
            directions :nextProps.info.medication.directions,
            purpose :nextProps.info.medication.purpose,
            sideEffects :nextProps.info.medication.sideEffects,

        };
    }

    handleCancel = () => {
        console.log("handleCancel");
    }


    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }
    onSelect = (e) => {
        this.setState({
            value_select: e,
        });
    }
    onAdvance = (e) => {
        this.setState({
            advance: true
        });
    }
    onTotal = (e) => {
        //console.log(e);
        this.setState({
            total: Number(this.state.total)+Number(e)
        });
    }
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
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        const {info,loading} = this.props;


        if (loading) {
            return  '<div>Loading</div>';
        }


        const dateFormat = 'YYYY-MM-DD';
        const Take = [];
        for(var i=0; i<this.state.value_select; i++) {
            Take.push(  {
                item:     <div >
                    <Col  span={12}>
                        <Select  style={{ width: 100 }} >
                            <Option value="2">2am</Option>
                            <Option value="3">3am</Option>
                            <Option value="4">4am</Option>
                            <Option value="5">5am</Option>
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select onSelect={this.onTotal}  style={{ width: 80 }} >
                            <Option value="0.25">1/4</Option>
                            <Option value="0.75">¾</Option>
                            <Option value="1">1</Option>
                            <Option value="1.25">1.25</Option>
                            <Option value="1.5">1.5</Option>
                        </Select>
                    </Col>
                </div>
            })
        }



        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="Take"
                >
                        <Col offset={6} span={6}>
                            <RadioGroup onChange={this.onChange}  value={this.state.value}>
                                <Radio style={radioStyle} value={1}>At specific times</Radio>
                                <Radio style={radioStyle} value="at_times">Along the day</Radio>
                                <Radio style={radioStyle} value={3}>As needed</Radio>
                            </RadioGroup>
                        </Col>

                </FormItem>

                {this.state.value === 1 ?
                    <Row>
                        <Col span={6}>
                            Times per Day
                        </Col>
                        <Col span={12}>
                            <Select onSelect={this.onSelect}  style={{ width: 200 }}>
                                <OptGroup >
                                    <Option value="1">1 Time</Option>
                                    <Option value="2">2 Time</Option>
                                    <Option value="3">3 Time</Option>
                                    <Option value="4">4 Time</Option>
                                    <Option value="5">5 Time</Option>
                                </OptGroup>
                            </Select>
                            <Col span={12}><label>Take at</label></Col>
                            <Col span={6}><label>Quantity</label></Col>
                            <List
                                grid={{gutter: 5, md: 1}}
                                dataSource={Take}
                                renderItem={item => (
                                    <List.Item>
                                        {item.item}
                                    </List.Item>
                                )}
                            />
                            <Col span={12}><label>Total</label></Col>
                            <Col span={6}><label>{this.state.total}</label></Col>
                        </Col>
                    </Row> : null}
                {this.state.value === "at_times"|| this.state.value === 3?
                    <Row>
                        <Col span={6}>
                        </Col>
                        <Col span={12}>
                            <Col span={15}>
                                <label>Take</label>
                                <Select  defaultValue="1" >
                                    <OptGroup >
                                        <Option value="1">1 Time a Day</Option>
                                        <Option value="2">2 Time a Day</Option>
                                        <Option value="3">3 Time a Day</Option>
                                        <Option value="4">4 Time a Day</Option>
                                        <Option value="5">5 Time a Day</Option>
                                        <Option value="6">6 Time a Day</Option>
                                        <Option value="7">7 Time a Day</Option>
                                        <Option value="8">8 Time a Day</Option>
                                        <Option value="9">9 Time a Day</Option>
                                    </OptGroup>
                                </Select>
                            </Col>
                            <Col span={6}><label>Quantity</label>
                                <Select defaultValue="1" style={{ width: 80 }} >
                                    <Option value="1/4">1/4</Option>
                                    <Option value="1/2">1/2</Option>
                                    <Option value="1">1</Option>
                                </Select>
                            </Col>
                        </Col>
                    </Row> : null}
                <br/>
                <Row>
                    <Col span={6}>Period</Col>
                    <Col span={15}>
                        <Col span={12}>
                            <DatePicker
                                format={dateFormat}
                                value={moment(this.state.startValue, dateFormat)}
                                placeholder="Start"
                                //  onChange={this.onStartChange}
                            />
                        </Col>
                        <Col span={12}>
                            <DatePicker
                                format={dateFormat}
                                value={moment(this.state.endValue, dateFormat)}
                                placeholder="End"
                                onChange={this.onEndChange}
                                // open={endOpen}
                            />
                        </Col>
                    </Col>
                </Row>
                <br/>
                {!this.state.advance ?
                    <a onClick={this.onAdvance}>Advance</a>:null}
                {this.state.advance ?
                    <div>
                        <Row>
                            <Col span={6}>Purpose</Col>
                            <Col span={18}>
                                <Input value={this.state.purpose} />
                            </Col>
                        </Row><br/>
                        <Row>
                            <Col span={6}>Directions</Col>
                            <Col span={18}>
                                <Input value={this.state.directions}/>
                            </Col>
                        </Row><br/>
                        <Row>
                            <Col span={6}>Side Effects</Col>
                            <Col span={18}>
                                <Input  value={this.state.sideEffects}/>
                            </Col>
                        </Row>
                    </div>
                    : null
                }
            </Form>

        );
    }
}

const WrappedEditMedicationForm = Form.create()(EditMedicationForm);
export default WrappedEditMedicationForm;