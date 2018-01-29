/**
 * Created by Павел on 20.01.2018.
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';
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
            return  <Card loading bordered={false} >
                Loading</Card>;
        }
        //console.log(info);
        const  {notifications} = info;
        const  {edges} = notifications;
        //console.log(edges);
        return (
             <List
                    style={{ maxHeight: 400, maxWidth:400, overflow: 'auto'}}
                    loading={loading}
                    dataSource={edges}
                    renderItem={message => (

                        <List.Item key={message.id}>

                            <List.Item.Meta
                                avatar={<Avatar style={{ verticalAlign: 'middle', backgroundColor: message.sender.color }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={message.text}
                                description={moment(message.dateSent).calendar()}
                            />



                        </List.Item>
                    )}
                />


        );
    }
}

const WrappedNotifications = Form.create()(Notifications);
export default WrappedNotifications;