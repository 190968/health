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

const RangePicker = DatePicker.RangePicker;

const RadioGroup = Radio.Group;

class EditMedicationForm extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            visibled: false,
            visible: false,
            value: 1,
            advance: false,
            value_select: 1,
            total: 0,
        };
    };

    componentWillMount = () => {
        const {info,loading} = this.props;
       // const {medication} = info;
       // if (loading) {
            console.log(loading,info);//не false
       // }
    //  console.log(this.props);
    }

    handleCancel = () => {
        console.log("handleCancel");
    }

    handleClick = () => {
        // console.log( );
        //console.log("handleClick");
        // visibled = false;
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
        console.log(e);
        this.setState({
            total: Number(this.state.total)+Number(e)
        });
    }
    render() {

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        const {info,loading} = this.props;
        //const {medication} = info;

      if (loading) {
            return  '<div>Loading</div>';
        }


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
                <Select onSelect={this.onTotal} style={{ width: 80 }} >
                    <Option value="0.25">1/4</Option>
                    <Option value="0.5">1/2</Option>
                    <Option value="1">1</Option>
                    <Option value="1.25">1.25</Option>
                    <Option value="1.5">1.5</Option>
                </Select>
                </Col>
                    </div>
            })
        }


        let { visible } = this.state;
        return (
            // <Modal
            //     visible={this.props.visibled}
            //     title={<FormattedMessage id="plan.medicationplan.medication.medicationedit.modal.title" defaultMessage="Edit Medication" description="Edit Medication" />}
            //     onOk={this.handleOk}
            //     onCancel={this.handleCancel}
            //     footer={[
            //         <center>
            //             <Button key="submit" type="primary" onClick={this.handleClick}>
            //                 <FormattedMessage id="plan.medicationplan.medication.medicationedit.modal.button" defaultMessage="Save Changes" description="Save Changes" />
            //             </Button></center>,
            //     ]}
            // >
            <div>
                <Row>
                    <Col span={6}>Take</Col>
                    <Col span={6}>
                        <RadioGroup onChange={this.onChange}  value={this.state.value}>
                            <Radio style={radioStyle} value={1}>At specific times</Radio>
                            <Radio style={radioStyle} value={2}>Along the day</Radio>
                            <Radio style={radioStyle} value={3}>As needed</Radio>
                        </RadioGroup>
                    </Col>
                </Row>

                {this.state.value === 1 ?
                    <Row>
                        <Col span={6}>
                            Times per Day
                        </Col>
                        <Col span={12}>
                            <Select onSelect={this.onSelect} defaultValue={1+" Time"} style={{ width: 200 }}>
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
                {this.state.value === 2|| this.state.value === 3?
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
                        <RangePicker
                            //defaultValue={[item.startDay,item.endDay]}
                            ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                        />
                    </Col>
                </Row>
                <br/>
                {!this.state.advance ?
                    <p onClick={this.onAdvance}>Advance</p>:null}
                {this.state.advance ?
                    <div>
                        <Row>
                            <Col span={6}>Purpose</Col>
                            <Col span={18}>
                                <Input  />
                            </Col>
                        </Row><br/>
                        <Row>
                            <Col span={6}>Directions</Col>
                            <Col span={18}>
                                <Input />
                            </Col>
                        </Row><br/>
                        <Row>
                            <Col span={6}>Side Effects</Col>
                            <Col span={18}>
                                <Input />
                            </Col>
                        </Row>
                    </div>
                    : null
                }
                    </div>

        );
    }
}

const WrappedEditMedicationForm = Form.create()(EditMedicationForm);
export default WrappedEditMedicationForm;