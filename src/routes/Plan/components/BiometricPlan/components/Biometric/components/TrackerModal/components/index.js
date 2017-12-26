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



class EditTrackerForm extends React.Component {



    handleCancel = () => {
        console.log("handleCancel");
    }

    handleClick = () => {
        console.log("handleClick");
    }

    render() {

        return (
            <Modal
                   visible={true}
                   title={<FormattedMessage id="plan.biometricplan.biometric.trackermodal.modal.title" defaultMessage="Edit Tracker - " description="Edit Tracker" />}
                   onOk={this.handleOk}
                   onCancel={this.handleCancel}
                   footer={[
                       <center>
                           <Button key="submit" type="primary" onClick={this.handleClick}>
                               <FormattedMessage id="plan.biometricplan.biometric.trackermodal.modal.button" defaultMessage="Done" description="Done" />
                           </Button></center>,
                   ]}
            >
                <Row>
                    <Col span={6}>Critical Range</Col>
                        <Col span={6}>
                            <Col span={10}> below </Col><Col span={14}><Input /></Col>
                        </Col>
                        <Col span={6}>
                            <Col span={10}> above </Col><Col span={14}><Input /></Col>
                        </Col>
                </Row><br/>
                <Row>
                    <Col span={6}>Normal Range</Col>
                        <Col span={6}>
                            <Col span={10}> below </Col><Col span={14}><Input /></Col>
                        </Col>
                        <Col span={6}>
                            <Col span={10}> above </Col><Col span={14}><Input /></Col>
                        </Col>
                </Row><br/>
                <Row>
                    <Col span={6}># of Reports</Col>
                    <Col span={6}>
                        <Select onSelect={this.onSelect} defaultValue="1" style={{ width: 200 }}>
                            <OptGroup >
                                <Option value="1">1 Time</Option>
                                <Option value="2">2 Time</Option>
                                <Option value="3">3 Time</Option>
                                <Option value="4">4 Time</Option>
                                <Option value="5">5 Time</Option>
                            </OptGroup>
                        </Select>
                    </Col>
                </Row><br/>
                <Row>
                    <Col span={6}>Graph</Col>
                    <Col span={6}>
                        <Select onSelect={this.onSelect} defaultValue="Line" style={{ width: 200 }}>
                            <OptGroup >
                                <Option value="Line">Line</Option>
                                <Option value="Area">Area</Option>
                                <Option value="Bar">Bar</Option>
                            </OptGroup>
                        </Select>
                    </Col>
                </Row>

            </Modal>
        );
    }
}

const WrappedEditTrackerForm = Form.create()(EditTrackerForm);
export default WrappedEditTrackerForm;
