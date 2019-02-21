import React from 'react';
import ChatHeader from '../ChatHeader';
import ChatPresent from '../ChatPresent';
import ChatInfo from '../../containers/Info';
import ChatInput from '../../containers/ChatInput';
import  './index.less';

const Chat = props => {
    const {refetch} = props;
    return <div className={'panel'} style={ { display: 'flex' }}>
        <ChatHeader {...props} />
        <div style={{display: 'flex',
            flex: '1 1 0%', flexDirection: 'row-reverse'}}>
            {/* {this.state.showInfo && <ChatInfo {...props}  />} */}
            <div className={'panelMain'}>
                <ChatPresent {...props}  />

                <ChatInput id={props.id} refetch={refetch} />
            </div>
        </div>
    </div>
}
export default Chat;
