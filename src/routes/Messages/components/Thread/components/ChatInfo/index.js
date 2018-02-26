import React from 'react';
import styles from './index.less';
import moment from 'moment';
import {Avatar, Col, Row, Card, Button} from 'antd';

class ChatInfo extends React.Component {


    render() {
        const {loading} = this.props;

        if (loading) {
            return <Card loading>Loading...</Card>;
        }
        const {info} = this.props;
        const {subject,participants, createdAt} = info;


        let details = [
            ['Subject',subject],
            ['Created At',moment(createdAt).fromNow()],
            ['Participants', <div>{participants.edges.map((info, i) => {
            <div key={i}>{info.fullname}</div>
        })}</div>]
        ];

        return (<div className="chatInfo">
            {details.map(info => <Row key={info.toString()}>
                <Col md={12}>{info[0]}</Col>
                <Col md={12}>{info[1]}</Col>
            </Row>)}

            <Button type="danger">Leave Chat</Button>

        </div>);
    }
}

export default ChatInfo