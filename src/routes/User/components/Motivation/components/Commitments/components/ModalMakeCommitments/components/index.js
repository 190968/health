/**
 * Created by Павел on 12.02.2018.
 */
import React, { PropTypes } from 'react';
import {Button ,Row,Col,Avatar,Spin,Select, DatePicker , Input, Divider,Card,Modal } from 'antd';
const {Option} = Select;
class ModalPointsHistory extends React.Component {

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
        console.log(info);
        let selectItem =[];
        info.forEach(item=>{
            selectItem.push(  <Option key={item.id} value={item.title}>{item.title}</Option>)
        })

        return  (

            <Modal
                title="Make a Commitment"
                visible={true}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>Cancel</Button>
                ]}
            >
                {
                    this.state.visible && <div>
                <p>Select which Plan you would like to make a commitment to.</p><hr/>
                <center>
                    <Select defaultValue={info[0].title} style={{ width: 470 }} onChange={this.onChange}>
                        {selectItem}
                    </Select>
                </center></div>}
                {
                    !this.state.visible && <div>
                        <Row>
                            <Col span={9}>
                          <p>  If I do not complete my plan </p>
                                </Col>
                            <Col offset={1} span={7}>
                            <DatePicker />
                                </Col>
                            <Col offset={1} span={4}>
                                I will...
                             </Col>
                        </Row>
                        <Row>
                            <Col span={7}>
                                <Avatar style={{
                                    verticalAlign: 'middle'
                                }} size="large"  />
                                <span
                                    style={{textAlign: 'center', 'marginLeft': 10}}><p>Donate to a charity</p>
                                            </span>
                            </Col>
                            <Col offset={1} span={7}>
                                <Avatar style={{
                                    verticalAlign: 'middle'
                                }} size="large"  />
                                <span
                                    style={{textAlign: 'center', 'marginLeft': 10}}><p>Donate to a charity</p>
                                            </span>
                                <Select defaultValue={info[0].title} style={{ width: 150 }}>
                                    {selectItem}
                                </Select>
                                <span>How much?</span><Input addonAfter="$" />
                            </Col>
                            <Col  offset={1}  span={7}>
                                <Avatar style={{
                                    verticalAlign: 'middle'
                                }} size="large"  />
                                <span
                                    style={{textAlign: 'center', 'marginLeft': 10}}><p>Donate to a charity</p>
                                            </span>
                                <Input  />
                            </Col>
                        </Row>
                            <Row>
                            <Col  span={7}>
                                Add a URL describing your promise
                            </Col>
                            <Col  offset={1}  span={16}>

                                <Input  />
                            </Col>
                       </Row>
                    </div>}
            </Modal>
        );
    }
}
export default ModalPointsHistory;