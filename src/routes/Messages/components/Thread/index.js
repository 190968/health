import React from 'react';
import ChatConversation from './containers/Chat';
import  './index.less';


const MessageThread = props => {
    const {id=''} = props;

    return <div className={'mainPanel'}>

        {id !== '' ?
            <ChatConversation {...props}
        /> : <div className={'emptyMessage'} >Please select Conversation on the left side first</div>}
    </div>
}
export default MessageThread;