/**
 * Created by Павел on 20.01.2018.
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom'
import {
    FormattedMessage,
} from 'react-intl';

import { Form, Row,Col, List,Avatar, Card } from 'antd';

class Notifications extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const  {info,loading} = this.props;



        if (loading) {
            return  <Card loading title={<FormattedMessage id="user.family.family.title" defaultMessage="MY FAMILY" description="MY FAMILY" />}>
                Loading</Card>;
        }
       console.log(info);
        const  {notifications} = info;
        const  {edges} = notifications;
        console.log(edges);
        return (
             <List
                    split={false}
                    loading={loading}
                    dataSource={edges}
                    renderItem={message => (

                        <List.Item key={message.id}>
                            {
                                message.sender.firstName ?
                                    <Row>
                                        <Col span={5}>
                                             <Avatar style={{ verticalAlign: 'middle', backgroundColor: message.sender.color }}>{message.sender.firstName[0]}</Avatar>
                                         </Col>
                                        <Col span={19}>
                                            <p style={{textAlign:'center','marginLeft':10}}>{message.text.slice(0,15)}</p>
                                            <span style={{textAlign:'center','marginLeft':10}}>{message.dateSent.slice(11,16)}</span>
                                        </Col>

                                    </Row>
                                     :
                                    <div>
                                        <span><Avatar  style={{ verticalAlign: 'middle' }}>N</Avatar> </span>
                                        <span style={{textAlign:'center','marginLeft':10}}>{message.text.slice(0,20)}</span>
                                    </div>
                            }

                        </List.Item>
                    )}
                />


        );
    }
}

const WrappedNotifications = Form.create()(Notifications);
export default WrappedNotifications;