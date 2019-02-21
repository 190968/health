import React from 'react';
import ChatThreads from '../containers/ChatThreads';
import Thread from './Thread';
import { Layout } from 'antd';
import  './index.less';


const MessagesLayout = props => {
    const {match} = props;
    const {params} = match || {};
    const {id} = params || {};
    return (
        <div className="wrapperChat">
            <div className="chat">
                <div className="body">
                    <ChatThreads currentId={id} /*setLastCursor={this.setLastCursor}*/ />
                    <Thread id={id} /*lastCursor={this.state.lastCursor}*/ />
                {/* <Layout>
                    <Sider style={{overflow: 'auto', height: '100vh', left: 0,}}>
                        <ChatThreads currentId={id} setLastCursor={this.setLastCursor} />
                    </Sider>
                    <Layout>
                    <Content style={{ overflow: 'initial' }}>
                    <Thread id={id} lastCursor={this.state.lastCursor} />
                    </Content>
                    </Layout>
                </Layout> */}
                    
                    
                </div>
            </div>
        </div>
    );
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         lastCursor: ''
    //     }
    // }

    // setLastCursor = (cursor) => {
    //     this.setState({lastCursor:cursor});
    // }

    // render() {
        
    // }
}

export default MessagesLayout
