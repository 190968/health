import React from 'react';
import {Card,Row, Col, Affix, List, Avatar} from 'antd';
// RCE CSS
import 'react-chat-elements/dist/main.css';
// MessageBox component
import {Navbar, SideBar, Button, ChatList, Input, MessageList} from 'react-chat-elements';


class MessagesLayout extends React.Component {

    constructor(props){
        super(props);
    }

    render() {


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
