import React from 'react'
import { Link } from 'react-router-dom';
import Notification from '../../containers/Notifications'
import {Menu, Tabs, Popover, Icon, Avatar, Badge, notification } from 'antd';
import {connect} from "react-redux";
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;


export default class RightMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleUser = this.toggleUser.bind(this);
        this.state = {
            isOpen: false,
            isOpenUser: false,
            loading: false
        };
    }
    static defaultProps = {
        endCursor: 'aaa'
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    toggleUser() {
        this.setState({
            isOpenUser: !this.state.isOpenUser
        });
    }
    componentWillReceiveProps(nextProps) {
        // In this specific case you may want to use `options.pollInterval` instead.
        if (!nextProps.loading && this.props.loading) {
            console.log(this.props);//.startPolling(1000);
        }
        console.log(this.props);
    }
    render() {
        const new_messages = this.props.messages;
        const new_notifications = this.props.notifications;

        // if new messages, then show a notification
        const haveNewNotifications = false;
        if (haveNewNotifications) {
            // if we have 1-2 notification - show them. if we have more than 2, then show general message
            notification.open({
                message: 'Notification',
                description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            });
        }
        //console.log(this.props.endCursor);
        const user_menu_items = [
            ['Settings', '/settings'],
            ['Calendar', '/calendar', 'calendar'],
            ['Health', '/health', 'health'],
            ['Help Center', '/help', 'help'],
            [1],
            ['Logout', '/logout'],
        ];


        const content = (
            <Tabs defaultActiveKey="1" style={{width: 336}} >
                <TabPane tab="Notifications" key="1"><Notification /></TabPane>
                <TabPane tab="News" key="2">News Content</TabPane>
            </Tabs>
        );
        return (

                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={['1']}
                            mode="horizontal"
                            style={{'borderBottom':'none'}}
                        >



                            <Menu.Item key='inbox'>
                                <Link to="/messages"><Badge count={new_messages}><Icon type="mail" /></Badge></Link>
                            </Menu.Item>
                            <Menu.Item key='notifications'>
                                <Popover placement="bottomRight"  content={content} trigger="click" style={{width: 336}}>
                                    <Link to="/notifications"><Badge count={new_notifications}><Icon type="bell" /></Badge></Link>
                                </Popover>
                            </Menu.Item>


                            <SubMenu key="sub1" title={<span><Avatar size="small" style={{ verticalAlign: 'middle' }}>{this.props.user.firstName}</Avatar> <span>{this.props.user.firstName}!</span></span>}>

                                {user_menu_items.map((item) => {
                                    if (item.length == 1) {
                                        return (<Menu.Divider key={'div'} />)
                                    }
                                    return (
                                        <Menu.Item key={item.toString()}>
                                            <Link to={item[1]}>{item[0]}</Link>
                                        </Menu.Item>)

                                })}
                            </SubMenu>

                        </Menu>

        );
    }
}
