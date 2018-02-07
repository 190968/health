import React from 'react';
import styles from './index.less';
import { getRequestAnimationFrame, easeInOutCubic } from '../../../../../../utils/animate';
import moment from 'moment';
import {Avatar, Card} from 'antd';

const reqAnimFrame = getRequestAnimationFrame();

class ChatPresent extends React.Component {

    static defaultProps = {
        messages:[]
    }
    componentDidMount() {
        this.scrollIntoView();
    }
    componentDidUpdate() {
        this.scrollIntoView();
    }
    scrollIntoView = () => {
        if (this.props.loading) { return; }
        if (!this.container) { return; }
        const startTime = Date.now();
        const scrollTop = this.container.scrollTop;
        const targetScrollTop = this.container.scrollHeight;
        const frameFunc = () => {
            const timestamp = Date.now();
            const time = timestamp - startTime;
            this.container.scrollTop = easeInOutCubic(time, scrollTop, targetScrollTop, 450);
            if (time < 450) {
                reqAnimFrame(frameFunc);
            }
        };
        reqAnimFrame(frameFunc);
    }
    render() {
        const { loading, messages, userId } = this.props;

        if (loading) {
           // return <Card  bordered={false} loading>Loading...</Card>
        }
        return (<div
            ref={c => {this.container = c;}}
            className={'chatPresent'}
        >
            {messages.map((conversation, idx) => {
                const isMe = conversation.sender && conversation.sender.id === userId;
                const from = isMe ? 'me' : conversation.sender.fullName;

                return (<div key={`present-${idx}`} className={isMe ? 'me' : 'chatMessage'}>
                    {!isMe ?  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{float:'left'}} /> : null }

                    <span className={'meta'}>

                        {!isMe && <span className={'userName'}>
              {from}
            </span>}

                            <span className={'time'}>
              {moment(conversation.sentAt).format('LLL')}
            </span>

        </span>

                    <div className={'bubble'}>
                        <span dangerouslySetInnerHTML={{ __html: conversation.text }} />
                    </div>
                </div>);


            })}
        </div>);
    }
}

export default ChatPresent