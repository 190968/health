import React from 'react';
import {Tooltip, Icon, Row, Col} from 'antd';
import ThreadList from './components/ThreadList';
import styles from './index.css';

export default class ChatThreads extends React.Component {

    static defaultProps = {
        currentId: ''
    }

    componentWillReceiveProps(nextProps) {

        if (!nextProps.loading) {
            const {conversations, currentId} = nextProps;
            conversations.map(info => {
                if (info.id == currentId) {
                    // if it's current conversation, then check the last message
                    const {lastMessage} = info;
                    const {id} = lastMessage;
                    this.props.setLastCursor(id);
                }
            })
        }
        /*if (nextProps.lastCursor !== this.props.lastCursor  ) {
            this.props.setLastCursor(nextProps.lastCursor);
        }*/
    }
    render() {

        const {conversations, currentId} = this.props;
        return (<div className={'slider'}>
            <div className={'visitorList'}>
                <Row type="flex" className={'sliderHeader'}>
                    <Col md={18}>Conversations</Col>
                    <Col md={6} style={{textAlign: 'right'}}><Tooltip title="Create Conversation"><Icon type="form" style={{color: '#1a8fff'}}/></Tooltip></Col>
                </Row>
                <ThreadList conversations={conversations} currentId={currentId}/>
            </div>
        </div>);
    }
}