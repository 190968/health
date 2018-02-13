import React from 'react'
import { Link } from 'react-router-dom';
import Notification from '../../containers/Notifications'
import MenuBadges from './containers/MenuBadges';
import {Menu, Avatar, Row, Col } from 'antd';
const SubMenu = Menu.SubMenu;


export default class RightMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleUser = this.toggleUser.bind(this);
        this.state = {
            isOpen: false,
            isOpenUser: false,
            loading: false,
            notificationsLastCursor: props.lastCursor
        };
    }
    updateLastNotification = (cursor) => {
        //console.log(cursor, 'New cursor');
        this.setState({notificationsLastCursor: cursor});
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

    render() {

        const user_menu_items = [
            ['Settings', '/settings'],
            ['Calendar', '/calendar', 'calendar'],
            ['Health', '/health', 'health'],
            ['Help Center', '/help', 'help'],
            [1],
            ['Logout', '/logout'],
        ];


        return (
            <Row type="flex" justify="end" align="middle">
                <Col>
                    <Menu
                        onClick={this.handleClick}
                        selectedKeys={['1']}
                        mode="horizontal"
                        style={{'borderBottom':'none', 'float':'right'}}
                    >
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
                    <MenuBadges lastNotificationCursor={this.state.notificationsLastCursor} updateLastNotification={this.updateLastNotification} />


                </Col>
            </Row>
        );
    }
}
