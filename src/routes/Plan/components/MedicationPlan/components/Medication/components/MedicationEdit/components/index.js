/**
 * Created by Pavel on 21.12.2017.
 */
import React, { PropTypes } from 'react';
import {
    FormattedMessage,
} from 'react-intl';

import moment from 'moment';
import { Form ,List,Radio,Row,TimePicker, Col,Select,Input, DatePicker , Button } from 'antd';
const { Option, OptGroup } = Select;
const FormItem = Form.Item;
const format = 'h:mm a';
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
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

class EditMedicationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //showHours : null,
            //startDate: null,
            //endDate: null,
            //select_value:1,
            total:null
        };
    };

    /*componentWillMount = (nextProps) => {
        console.log(this.props);
        this.setState({
            //showHours: this.props.info.medication.type,
            //startDate:nextProps.info.medication.startDate,
            //endDate:nextProps.info.medication.endDate,
        });
    }

    /*componentDidUpdate = (nextProps) => {
        console.log(this.props);
        this.setState({
            //showHours: this.props.info.medication.type,
            //startDate:nextProps.info.medication.startDate,
            //endDate:nextProps.info.medication.endDate,
        });
    }*/

    handleCancel = () => {
        console.log("handleCancel");
    }

    onChangeDate = (field, value) => {
        this.setState({
            [field]: value,
        });
        console.log("onChangeDate");
    }
    onChange = (e) => {
        this.setState({
            showHours: e.target.value,
        });
        console.log(e.target.value,"onChange");
    }


    disabledStartDate = (startValue) => {
        const endValue = this.state.endDate;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startDate;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }
    onSelect = (e) => {
        /*this.setState({
            select_value: e
        });*/
        //console.log("onSelect");
    }
    onAdvance = (e) => {
        this.setState({
            advance: true
        });
    }
    onTotal = (e) => {
        console.log(e," -- onTotal");
        this.setState({
            total: Number(this.state.total)+Number(e)
        });
    }

    onStartChange = (value) => {
        this.onChangeDate('startDate', value);
    }

    onEndChange = (value) => {
        this.onChangeDate('endDate', value);
    }
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;

        const {info,loading} = this.props;

        if (loading) {
            return  '<div>Loading</div>';
        }

        const {type, timesPerDay, timesPerHour, startDate, endDate, purpose, sideEffects, directions} = info.medication;

        const dateFormat = 'YYYY-MM-DD';
        let quantity = 0;
        let qwer = 0;
        const Take = [];
        if(timesPerHour != null) {
            timesPerHour.forEach((item)=> {
                quantity ++;
                qwer += item.quantity;
                Take.push({
                    item: <div >
                        <Col span={10}>
                        <FormItem
                            {...formItemLayout}
                        >

                            {getFieldDecorator('takeAt', {
                                initialValue: moment(item.time, format)
                            })(
                                <TimePicker format={format} minuteStep={30} use12Hours={true} />
                            )}
                            </FormItem>
                        </Col>
                        <Col offset={1} span={6}>
                        <FormItem
                            {...formItemLayout}
                        >

                            {getFieldDecorator('tak5eAt'+quantity, {
                                initialValue: item.quantity
                            })(
                                <Select onChange={this.onTotal} style={{width: 80}}>
                                    <Option value="0.25">¼</Option>
                                    <Option value="0.50">½</Option>
                                    <Option value="0.75">¾</Option>
                                    <Option value="1">1</Option>
                                    <Option value="1.25">1¼</Option>
                                    <Option value="1.50">1½</Option>
                                    <Option value="1.75">1¾</Option>
                                    <Option value="2">2</Option>
                                    <Option value="2.25">2¼</Option>
                                    <Option value="2.50">2½</Option>
                                    <Option value="2.75">2¾</Option>
                                    <Option value="3">3</Option>
                                    <Option value="3.25">3¼</Option>
                                    <Option value="3.50">3½</Option>
                                    <Option value="3.75">3¾</Option>
                                    <Option value="4">4</Option>
                                    <Option value="4.25">4¼</Option>
                                    <Option value="4.50">4½</Option>
                                    <Option value="4.75">4¾</Option>
                                    <Option value="5">5</Option>
                                    <Option value="5.25">5¼</Option>
                                    <Option value="5.50">5½</Option>
                                    <Option value="5.75">5¾</Option>
                                    <Option value="6">6</Option>
                                    <Option value="6.25">6¼</Option>
                                    <Option value="6.50">6½</Option>
                                    <Option value="6.75">6¾</Option>
                                    <Option value="7">7</Option>
                                    <Option value="7.25">7¼</Option>
                                    <Option value="7.50">7½</Option>
                                    <Option value="7.75">7¾</Option>
                                    <Option value="8">8</Option>
                                    <Option value="8.25">8¼</Option>
                                    <Option value="8.50">8½</Option>
                                    <Option value="8.75">8¾</Option>
                                    <Option value="9">9</Option>
                                    <Option value="9.25">9¼</Option>
                                    <Option value="9.50">9½</Option>
                                    <Option value="9.75">9¾</Option>
                                </Select>
                            )}
                            </FormItem>
                        </Col>

                    </div>
                })
            })
        }

        return (
            <Form>

                {<FormItem
                 {...formItemLayout}
                 label={<FormattedMessage id="user.settings.basic.title" defaultMessage="Take" description="Take" />}
                 >
                 {getFieldDecorator('type', {
                    initialValue: type
                 })(

                 <RadioGroup onChange={this.onChange} >
                     <Radio style={radioStyle} value="at_times">At specific times</Radio>
                     <Radio style={radioStyle} value="along_day">Along the day</Radio>
                     <Radio style={radioStyle} value="as_needed">As needed</Radio>
                 </RadioGroup>
                 )}
                 </FormItem>}






                {getFieldValue('type') === "at_times" ?
                    <FormItem
                        {...formItemLayout}
                        label={<FormattedMessage id="medication.times_per_day" defaultMessage="Times per Day" description="Times per Day" />}
                    >

                        {getFieldDecorator('timesPerHour', {
                            initialValue: timesPerHour.length
                        })(
                            <Select onSelect={this.onSelect} style={{ width: 200 }}>
                                    <Option value="1">1 Time</Option>
                                    <Option value="2">2 Times</Option>
                                    <Option value="3">3 Times</Option>
                                    <Option value="4">4 Times</Option>
                                    <Option value="5">5 Times</Option>
                            </Select>
                        )}
                            <Row>
                                <Col span={10}><label>Take at</label></Col>
                                <Col offset={1} span={6}><label>Quantity</label></Col>
                            </Row>
                            <List
                                grid={{gutter: 5, md: 1}}
                                dataSource={Take}
                                renderItem={item => (
                                    <List.Item>
                                        {item.item}
                                    </List.Item>
                                )}
                            />

                            <Col offset={7} span={5}><label>Total</label></Col>
                            <Col span={6}><label>{qwer}</label></Col>
                    </FormItem> :
                    <Row>
                        <Col offset={6} span={10}>
                            <FormItem
                                {...formItemLayout}
                                label={'Take'}
                                labelCol={{span: 3, offset: 12}}
                            >
                                    {getFieldDecorator('timesPerDay', {
                                        initialValue:  timesPerDay
                                    })(
                                        <Select onSelect={this.onSelect} style={{ width: 200 }}>
                                            <Option value="1">1 Time</Option>
                                            <Option value="2">2 Times</Option>
                                            <Option value="3">3 Times</Option>
                                            <Option value="4">4 Times</Option>
                                            <Option value="5">5 Times</Option>
                                        </Select>
                                    )}
                            </FormItem>
                        </Col>
                        <Col offset={1} span={6}>
                        <FormItem
                            {...formItemLayout}
                        >
                                {getFieldDecorator('quantity', {
                                    initialValue: quantity
                                })(
                                    <Select onChange={this.onTotal} style={{ width: 80 }} >
                                        <Option value="0.25">¼</Option>
                                        <Option value="0.50">½</Option>
                                        <Option value="0.75">¾</Option>
                                        <Option value="1">1</Option>
                                        <Option value="1.25">1¼</Option>
                                        <Option value="1.50">1½</Option>
                                        <Option value="1.75">1¾</Option>
                                        <Option value="2">2</Option>
                                        <Option value="2.25">2¼</Option>
                                        <Option value="2.50">2½</Option>
                                        <Option value="2.75">2¾</Option>
                                        <Option value="3">3</Option>
                                        <Option value="3.25">3¼</Option>
                                        <Option value="3.50">3½</Option>
                                        <Option value="3.75">3¾</Option>
                                        <Option value="4">4</Option>
                                        <Option value="4.25">4¼</Option>
                                        <Option value="4.50">4½</Option>
                                        <Option value="4.75">4¾</Option>
                                        <Option value="5">5</Option>
                                        <Option value="5.25">5¼</Option>
                                        <Option value="5.50">5½</Option>
                                        <Option value="5.75">5¾</Option>
                                        <Option value="6">6</Option>
                                        <Option value="6.25">6¼</Option>
                                        <Option value="6.50">6½</Option>
                                        <Option value="6.75">6¾</Option>
                                        <Option value="7">7</Option>
                                        <Option value="7.25">7¼</Option>
                                        <Option value="7.50">7½</Option>
                                        <Option value="7.75">7¾</Option>
                                        <Option value="8">8</Option>
                                        <Option value="8.25">8¼</Option>
                                        <Option value="8.50">8½</Option>
                                        <Option value="8.75">8¾</Option>
                                        <Option value="9">9</Option>
                                        <Option value="9.25">9¼</Option>
                                        <Option value="9.50">9½</Option>
                                        <Option value="9.75">9¾</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>}












                    <Row>
                    <Col span={11}>
                        <FormItem
                            label={<FormattedMessage id="medication.period" defaultMessage="Period" description="Period" />}
                        >
                        {getFieldDecorator('startDate', {
                                initialValue: moment(startDate, dateFormat),
                            })(
                            <DatePicker
                                disabledDate={this.disabledStartDate}
                                format={dateFormat}
                                placeholder="Start"
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
                                initialValue: moment(endDate, dateFormat),
                            })(
                            <DatePicker
                                disabledDate={this.disabledEndDate}
                                format={dateFormat}
                                placeholder="End"
                            />
                            )}
                        </FormItem>
                            </Col>
                    </Row>






                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage id="user.settings.basic.tdegsiftdle" defaultMessage="Image" description="Image" />}
                >
                    {getFieldDecorator('purpose', {
                        initialValue: '',
                    })(
                        <Col>
                        <a>Browse</a>
                        <p>Min. dimensions: 150x150px</p>  {/*style*/}

                            </Col>
                    )}
                </FormItem>

                {/*Advanced settings*/}
                {!this.state.advance ?
                    <a onClick={this.onAdvance}>Advanced</a>:
                    <div>
                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage id="user.settings.basic.tdgsiftdle" defaultMessage="Purpose" description="Purpose" />}
                        >
                                {getFieldDecorator('purpose', {
                                    initialValue: purpose,
                                })(
                                    <Input />
                                )}
                           </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage id="user.settings.basic.tdsitfdle" defaultMessage="Directions" description="Direcctions" />}
                        >
                                {getFieldDecorator('directions', {
                                    initialValue: directions,
                                })(
                                    <Input />
                                )}
                          </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage id="user.settings.basic.tddsitdle" defaultMessage="Side Effects" description="Side Effects" />}
                        >
                                {getFieldDecorator('sideEffect', {
                                    initialValue: sideEffects,
                                })(
                                <Input />
                                )}
                              </FormItem>
                        </div>

                }
            </Form>

        );
    }
}

const WrappedEditMedicationForm = Form.create()(EditMedicationForm);
export default WrappedEditMedicationForm;