/**
 * Created by Павел on 12.02.2018.
 */
import React, { PropTypes } from 'react';
import {Avatar,Button,Tooltip,Col,List, Modal } from 'antd';
class BadgesListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible:false
        };
    }
    showModal = () => {
        this.setState({visible: true});
    }
    handleCancel = () => {
        this.setState({ visible: false});
    }
    render() {
        const  {item} = this.props;

        return  (

                        <Col span={8}>
                            <Modal
                                visible = {this.state.visible}
                                  title={item.badge.title}
                                onCancel={this.handleCancel}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>Cancel</Button>
                                ]}
                            >
                               <center>
                                       <Avatar style={{
                                        verticalAlign: 'middle'
                                    }} size="large" src={item.badge.image} />
                                </center>
                                <span
                                    style={{textAlign: 'center', 'marginLeft': 10}}><p>{item.badge.congratsMessage}</p>
                                    </span>
                            </Modal>
                            <List.Item key={item.id}>
                                <Tooltip  style={{height:100,background:"red"}} placement="bottom" title={item.badge.title+" - "+item.badge.description}>
                                    <Avatar style={{
                                        verticalAlign: 'middle'
                                    }} size="large" src={item.badge.image} onClick={this.showModal} />
                                    <span
                                        style={{textAlign: 'center', 'marginLeft': 10}}><p>{item.badge.title}</p>
                                    </span>
                                </Tooltip >
                            </List.Item>
                        </Col>


        );
    }
}
export default BadgesListItem;