import React from 'react';
import {Card,Row, Col, Affix, Layout, Menu, Icon} from 'antd';

// RCE CSS
import 'react-chat-elements/dist/main.css';
// MessageBox component
import {Navbar, SideBar, Button, ChatList, Input, MessageList} from 'react-chat-elements';
const { Header, Content, Footer, Sider } = Layout;

class MessagesLayout extends React.Component {

    constructor(props){
        super(props);
    }

    render() {


        return (<Layout>
            <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1">
                        <Icon type="user" />
                        <span className="nav-text">nav 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="video-camera" />
                        <span className="nav-text">nav 2</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="upload" />
                        <span className="nav-text">nav 3</span>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="bar-chart" />
                        <span className="nav-text">nav 4</span>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Icon type="cloud-o" />
                        <span className="nav-text">nav 5</span>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Icon type="appstore-o" />
                        <span className="nav-text">nav 6</span>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Icon type="team" />
                        <span className="nav-text">nav 7</span>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Icon type="shop" />
                        <span className="nav-text">nav 8</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                        ...
                        <br />
                        Really
                        <br />...<br />...<br />...<br />
                        long
                        <br />...<br />...<br />...<br />...<br />...<br />...
                        <br />...<br />...<br />...<br />...<br />...<br />...
                        <br />...<br />...<br />...<br />...<br />...<br />...
                        <br />...<br />...<br />...<br />...<br />...<br />...
                        <br />...<br />...<br />...<br />...<br />...<br />...
                        <br />...<br />...<br />...<br />...<br />...<br />...
                        <br />...<br />...<br />...<br />...<br />...<br />
                        content
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2016 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>);

        return (<Card><Row>
            <Col xs={5} >
                <Affix   >

                            <ChatList style={{borderRight:'1px solid #ccc;'}}
                                className='chat-list'
                                dataSource={[
                                    {
                                        avatar: 'https://facebook.github.io/react/img/logo.svg',
                                        alt: 'Reactjs',
                                        title: 'Facebook',
                                        subtitle: 'What are you doing?',
                                        date: new Date(),
                                        unread: 1,
                                    },
                                    {
                                        avatar: 'https://facebook.github.io/react/img/logo.svg',
                                        alt: 'Reactjs',
                                        title: 'Facebook',
                                        subtitle: 'What are you doing?',
                                        date: new Date(),
                                        unread: 0,
                                    },
                                    {
                                        avatar: 'https://facebook.github.io/react/img/logo.svg',
                                        alt: 'Reactjs',
                                        title: 'Facebook',
                                        subtitle: 'What are you doing?',
                                        date: new Date(),
                                        unread: 0,
                                    },
                                    {
                                        avatar: 'https://facebook.github.io/react/img/logo.svg',
                                        alt: 'Reactjs',
                                        title: 'Facebook',
                                        subtitle: 'What are you doing?',
                                        date: new Date(),
                                        unread: 0,
                                    },
                                    {
                                        avatar: 'https://facebook.github.io/react/img/logo.svg',
                                        alt: 'Reactjs',
                                        title: 'Facebook',
                                        subtitle: 'What are you doing?',
                                        date: new Date(),
                                        unread: 0,
                                    },
                                    {
                                        avatar: 'https://facebook.github.io/react/img/logo.svg',
                                        alt: 'Reactjs',
                                        title: 'Facebook',
                                        subtitle: 'What are you doing?',
                                        date: new Date(),
                                        unread: 0,
                                    },
                                    {
                                        avatar: 'https://facebook.github.io/react/img/logo.svg',
                                        alt: 'Reactjs',
                                        title: 'Facebook',
                                        subtitle: 'What are you doing?',
                                        date: new Date(),
                                        unread: 0,
                                    },
                                    {
                                        avatar: 'https://facebook.github.io/react/img/logo.svg',
                                        alt: 'Reactjs',
                                        title: 'Facebook',
                                        subtitle: 'What are you doing?',
                                        date: new Date(),
                                        unread: 0,
                                    },
                                    {
                                        avatar: 'https://facebook.github.io/react/img/logo.svg',
                                        alt: 'Reactjs',
                                        title: 'Facebook',
                                        subtitle: 'What are you doing?',
                                        date: new Date(),
                                        unread: 0,
                                    },
                                ]} />


                </Affix>
            </Col>
            <Col offset={6}>
                <MessageList
                    className='message-list'
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={[
                        {
                            position: 'right',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                        },
                        {
                            position: 'left',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                        },
                        {
                            position: 'left',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                        },
                        {
                            position: 'right',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                        },
                        {
                            position: 'right',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                        },
                        {
                            position: 'left',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                        },
                        {
                            position: 'left',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                        },
                        {
                            position: 'right',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                        },
                        {
                            position: 'right',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                        },
                        {
                            position: 'left',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                        },
                        {
                            position: 'left',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                        },
                        {
                            position: 'right',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                        },
                        {
                            position: 'right',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                        },

                        ]} />

                <Input
                    placeholder="Type here..."
                    multiline={true}
                    buttons={
                        <Button
                            color='white'
                            backgroundColor='black'
                            text='Send'/>
                    }/>
            </Col>
        </Row></Card>)
    }
}

export default MessagesLayout
