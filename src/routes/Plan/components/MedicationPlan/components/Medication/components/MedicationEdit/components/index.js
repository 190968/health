/**
 * Created by Pavel on 21.12.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    FormattedMessage,
} from 'react-intl';

import moment from 'moment';
import { Spin,  Modal, Form ,List,Radio,Row,TimePicker, Col,Select,Input, DatePicker} from 'antd';

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
let  finishTake = [];
var total= 0;
class EditMedicationForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            //showHours : null,
            //startDate: null,
            //endDate: null,
            //select_value:null,
            total:null
        };
    };

    static propTypes = {
        userId: PropTypes.string,
        drugId: PropTypes.string,
        id: PropTypes.string,

    }

    static defaultProps = {
        drugId: '',
        id: '',

    }

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
        this.setState({
            select_value: e
        });
        //console.log("onSelect");
    }
    onAdvance = (e) => {
        this.setState({
            advance: true
        });
    }
    onTotal = (e) => {
let notPermanent = 0;
        notPermanent += Number(e)
       total = notPermanent;
        console.log(e," -- onTotal",total);
    }

    onStartChange = (value) => {
        this.onChangeDate('startDate', value);
    }

    onEndChange = (value) => {
        this.onChangeDate('endDate', value);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { info, date, userId, drugId, updateMedication, onCancel } = this.props;
        const{id} = info;
        this.props.form.validateFields((err, values) => {
            console.log(values);
            const{type, startDate, endDate, purpose, directions, sideEffects, quantity, timesPerDay } = values;

            const startDateYMD = startDate.format("YYYY-MM-DD");
            const endDateYMD = endDate ? endDate.format("YYYY-MM-DD") : '';
            const input = {
                drugId: drugId,
                type: type,
                startDate: startDateYMD,
                endDate: endDateYMD,
                purpose: purpose,
                directions: directions,
                sideEffects: sideEffects,
                quantity: quantity,
                timesPerDay: timesPerDay,

            }
            if (!err) {
                // prepare fields here
                //{"details":{ "purpose":"","timesPerDay":"2","quantity":"1.25","takeAt00":"2018-01-11T21:00:00.000Z","quantityTake0":1,"takeAt01":"2018-01-11T21:00:00.000Z"}}.

                return updateMedication(id, userId, input, date, onCancel);
            }
        });

    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;

        const {info,loading} = this.props;

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

        let {type, drug, timesPerDay, timesPerHour, quantity, startDate, endDate, purpose, sideEffects, directions} = info;//.medication;

        const dateFormat = 'YYYY-MM-DD';
        let col = 0;
        console.log(info);

      if(timesPerDay==0){
          timesPerDay = 1;
      }

        const Take = [];
        const dopTake = [];
        for(let i=0;i<this.state.select_value-timesPerHour.length;i++){

            dopTake.push({
                    item: <div >
                        <Col span={10}>
                            <FormItem
                                {...formItemLayout}
                            >
                                {getFieldDecorator('takeAt'+col+i, {
                                    //initialValue: moment(timesPerHour[finishTake.length-1].time, format).add(1,'hours')
                                    initialValue: moment('00:00:00', format)
                                })(
                                    <TimePicker format={format} minuteStep={30} use12Hours={true} />
                                )}
                            </FormItem>
                        </Col>
                        <Col offset={1} span={6}>
                            <FormItem
                                {...formItemLayout}
                            >

                                {getFieldDecorator('quantityTake'+col, {
                                    initialValue: 1
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
        }

        if(timesPerHour != null) {
            timesPerHour.forEach((item)=> {
                col ++;
                Take.push({
                    item: <div >
                        <Col span={10}>
                        <FormItem
                            {...formItemLayout}
                        >

                            {getFieldDecorator('takeAt'+col, {
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

                            {getFieldDecorator('quantityTake'+col, {
                                initialValue: item.quantity
                            })(
                                <Select onChange={this.onTotal} style={{width: 80}}>
                                    <Option value={0.25}>¼</Option>
                                    <Option value={0.50}>½</Option>
                                    <Option value={0.75}>¾</Option>
                                    <Option value={1}>1</Option>
                                    <Option value={1.25}>1¼</Option>
                                    <Option value={1.50}>1½</Option>
                                    <Option value={1.75}>1¾</Option>
                                    <Option value={2}>2</Option>
                                    <Option value={2.25}>2¼</Option>
                                    <Option value={2.50}>2½</Option>
                                    <Option value={2.75}>2¾</Option>
                                    <Option value={3}>3</Option>
                                    <Option value={3.25}>3¼</Option>
                                    <Option value={3.50}>3½</Option>
                                    <Option value={3.75}>3¾</Option>
                                    <Option value={4}>4</Option>
                                    <Option value={4.25}>4¼</Option>
                                    <Option value={4.50}>4½</Option>
                                    <Option value={4.75}>4¾</Option>
                                    <Option value={5}>5</Option>
                                    <Option value={5.25}>5¼</Option>
                                    <Option value={5.50}>5½</Option>
                                    <Option value={5.75}>5¾</Option>
                                    <Option value={6}>6</Option>
                                    <Option value={6.25}>6¼</Option>
                                    <Option value={6.50}>6½</Option>
                                    <Option value={6.75}>6¾</Option>
                                    <Option value={7}>7</Option>
                                    <Option value={7.25}>7¼</Option>
                                    <Option value={7.50}>7½</Option>
                                    <Option value={7.75}>7¾</Option>
                                    <Option value={8}>8</Option>
                                    <Option value={8.25}>8¼</Option>
                                    <Option value={8.50}>8½</Option>
                                    <Option value={8.75}>8¾</Option>
                                    <Option value={9}>9</Option>
                                    <Option value={9.25}>9¼</Option>
                                    <Option value={9.50}>9½</Option>
                                    <Option value={9.75}>9¾</Option>
                                </Select>
                            )}
                            </FormItem>
                        </Col>

                    </div>
                })
            })

        }
      finishTake = Take.concat(dopTake);
        // finishTake.forEach((item)=> {
        //     //quantity += item._owner.memoizedProps.info.medication.timesPerHour[0].quantity;
        //     console.log(item.item._owner.memoizedProps.info);
        // })

        const  {title} = this.props;
        let fullTitle = title+' '+drug.name;



        return (
            <Modal
                visible={true}
                destroyOnClose
                maskClosable = {false}
                keyboard = {false}
                okText="Save"
                onCancel={this.props.onCancel}
                title={fullTitle}
                onOk={this.handleSubmit}
            >

            <Form>

                {<FormItem
                 {...formItemLayout}
                 label={<FormattedMessage id="user.settings.basic.title" defaultMessage="Take" description="Take" />}
                 >
                 {getFieldDecorator('type', {
                    initialValue: type
                 })(

                 <RadioGroup onChange={this.onTotal} >
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
                                    <Option value={1}>1 Time</Option>
                                    <Option value={2}>2 Times</Option>
                                    <Option value={3}>3 Times</Option>
                                    <Option value={4}>4 Times</Option>
                                    <Option value={5}>5 Times</Option>
                            </Select>
                        )}
                            <Row>
                                <Col span={10}><label>Take at</label></Col>
                                <Col offset={1} span={6}><label>Quantity</label></Col>
                            </Row>
                            <List
                                grid={{gutter: 5, md: 1}}
                                dataSource={finishTake}
                                renderItem={item => (
                                    <List.Item>
                                        {item.item}
                                    </List.Item>
                                )}
                            />

                        {/*<Col offset={7} span={5}><label>Total</label></Col>
                            <Col span={6}><label>{total}</label></Col>*/}
                    </FormItem> :

               <div>
                   <Row>
                       <Col offset={6}  span={10}><label>Take </label></Col>
                       <Col offset={1} span={6}><label>Quantity</label></Col>
                   </Row>
                    <Row>

                        <Col offset={6} span={10}>
                            <FormItem
                                {...formItemLayout}
                            >

                                    {getFieldDecorator('timesPerDay', {
                                        initialValue:  timesPerDay
                                    })(
                                        <Select onSelect={this.onSelect}  style={{ width: 200 }} >
                                            <Option value={1}>1 Time</Option>
                                            <Option value={2}>2 Times</Option>
                                            <Option value={3}>3 Times</Option>
                                            <Option value={4}>4 Times</Option>
                                            <Option value={5}>5 Times</Option>
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
                                        <Option value={0.25}>¼</Option>
                                        <Option value={0.50}>½</Option>
                                        <Option value={0.75}>¾</Option>
                                        <Option value={1}>1</Option>
                                        <Option value={1.25}>1¼</Option>
                                        <Option value={1.50}>1½</Option>
                                        <Option value={1.75}>1¾</Option>
                                        <Option value={2}>2</Option>
                                        <Option value={2.25}>2¼</Option>
                                        <Option value={2.50}>2½</Option>
                                        <Option value={2.75}>2¾</Option>
                                        <Option value={3}>3</Option>
                                        <Option value={3.25}>3¼</Option>
                                        <Option value={3.50}>3½</Option>
                                        <Option value={3.75}>3¾</Option>
                                        <Option value={4}>4</Option>
                                        <Option value={4.25}>4¼</Option>
                                        <Option value={4.50}>4½</Option>
                                        <Option value={4.75}>4¾</Option>
                                        <Option value={5}>5</Option>
                                        <Option value={5.25}>5¼</Option>
                                        <Option value={5.50}>5½</Option>
                                        <Option value={5.75}>5¾</Option>
                                        <Option value={6}>6</Option>
                                        <Option value={6.25}>6¼</Option>
                                        <Option value={6.50}>6½</Option>
                                        <Option value={6.75}>6¾</Option>
                                        <Option value={7}>7</Option>
                                        <Option value={7.25}>7¼</Option>
                                        <Option value={7.50}>7½</Option>
                                        <Option value={7.75}>7¾</Option>
                                        <Option value={8}>8</Option>
                                        <Option value={8.25}>8¼</Option>
                                        <Option value={8.50}>8½</Option>
                                        <Option value={8.75}>8¾</Option>
                                        <Option value={9}>9</Option>
                                        <Option value={9.25}>9¼</Option>
                                        <Option value={9.50}>9½</Option>
                                        <Option value={9.75}>9¾</Option>
                                    </Select>
                                )}

                            </FormItem>

                        </Col>
                        {/*<Col offset={14} span={3}><label>Total</label></Col>
                        <Col span={2}><label>jk</label></Col>*/}
                    </Row>
                   </div>
                    }




                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage id="medication.period" defaultMessage="Period" description="Period"/>}
                >
                    <Col span={11}>
                        <FormItem
                        >
                            {getFieldDecorator('startDate', {
                                initialValue: startDate ? moment(startDate) : moment(),
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
                            label={<FormattedMessage id="user.settings.basic.tdsitfdle1" defaultMessage="Directions" description="Direcctions" />}
                        >
                                {getFieldDecorator('directions', {
                                    initialValue: directions,
                                })(
                                    <Input />
                                )}
                          </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage id="user.settings.basic.tddsitdle1" defaultMessage="Side Effects" description="Side Effects" />}
                        >
                                {getFieldDecorator('sideEffects', {
                                    initialValue: sideEffects,
                                })(
                                <Input />
                                )}
                              </FormItem>
                        </div>

                }
            </Form>
            </Modal>
        );
    }
}

const WrappedEditMedicationForm = Form.create()(EditMedicationForm);
export default WrappedEditMedicationForm;