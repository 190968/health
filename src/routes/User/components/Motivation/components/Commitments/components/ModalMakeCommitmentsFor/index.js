/**
 * Created by Павел on 12.02.2018.
 */
import React, { PropTypes } from 'react';
import {Button ,Row,Col,Avatar,Spin,Select, DatePicker , Input, Divider,Card,Modal } from 'antd';
const {Option} = Select;
class ModalMakeCommitmentsFor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible:true
        };
    }
    onChange = () => {
        this.setState({ visible: false});
    }
    render() {
        const  {info,loading} = this.props;
        if (loading) {
            return    <Modal>
                <Spin/>
            </Modal> ;
        }
        // console.log(info);
        // let selectItem =[];
        // info.forEach(item=>{
        //     selectItem.push(  <Option key={item.id} value={item.title}>{item.title}</Option>)
        // })

        return  (

            <Modal
                style={{height:800, width: 800 }}
                title={"Make a Commitment for "+this.props.title}
                visible={true}
                onCancel={this.props.cancelParent}
                footer={[
                  <center> <Button type="primary"  onClick={this.props.makeCommitment}>Finish</Button></center>
                ]}
            >
             <div>
                        <Row>
                            <Col span={24}>
                                <p>  If I do not complete my plan {this.props.title}</p>
                            </Col>
                            <Col  span={6}>
                                <DatePicker />
                            </Col>
                            <Col offset={1} span={3}>
                                I will...
                            </Col>
                        </Row>
                 <br/>
                        <Row>

                            <Col span={7}>
                                <center>
                                <Avatar style={{
                                    verticalAlign: 'middle'
                                }} size="large"  />

                                <span
                                    style={{textAlign: 'center', 'marginLeft': 10}}><p>Pay a motivator</p>
                                            </span>

                                </center>
                            </Col>
                            <Col offset={2} span={7}>
                                <center>
                                <Avatar style={{
                                    verticalAlign: 'middle'
                                }} size="large"  />
                                <span
                                    style={{textAlign: 'center', 'marginLeft': 10}}><p>Donate to a charity</p>
                                            </span>
                                <Select  style={{ width: 150,marginBottom: 10 }}>
                                    {/*{selectItem}*/}
                                </Select>
                                    <Col style={{marginBottom: 10}} span={13}>
                                        <span>How much?</span>
                                    </Col>
                                    <Col style={{marginBottom: 10}} offset={1} span={10}>
                                        <Input
                                            suffix="$"
                                        />
                                    </Col>
                                    </center>
                            </Col>
                            <Col  offset={2}  span={5}>
                                <center>
                                <Avatar style={{
                                    verticalAlign: 'middle'
                                }} size="large"  />
                                <span
                                    style={{textAlign: 'center', 'marginLeft': 10}}><p>Other</p>
                                            </span>
                                <Input  />
                                </center>
                            </Col>



                        </Row>
                        <Row>
                            <Col  span={12}>
                                Add a URL describing your promise
                            </Col>
                            <Col    span={12}>

                                <Input  />
                            </Col>
                        </Row>
                    </div>
            </Modal>
        );
    }
}
export default ModalMakeCommitmentsFor;