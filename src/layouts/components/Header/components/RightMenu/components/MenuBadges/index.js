import React from 'react'
import { Link } from 'react-router-dom';
import {Menu, Icon,  Badge } from 'antd';
import NotificationBadge from '../../containers/NotificationBadge';


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
        lastNotification: ''// last notification cursor
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
        const {messages, loading, lastNotificationCursor, newCursor, newNotificationsNum} = this.props;
        //console.log(this.props, 'PropsIn Menu Badge');
        // first call - lastNotification - empty, but lastCursor has value. It means that we can load the notifications
        const loadNew = !loading && lastNotificationCursor !== newCursor;
        return (
            <Menu
                selectedKeys={['1']}
                mode="horizontal"
                style={{'borderBottom':'none'}}
            >
                <Menu.Item key='inbox'>
                    <Link to="/messages"><Badge count={messages}><Icon type="mail" /></Badge></Link>
                </Menu.Item>
                <Menu.Item key='notifications'>
                    <NotificationBadge newNotificationsNum={newNotificationsNum}  loadNew={loadNew} newCursor={newCursor} lastCursor={lastNotificationCursor} updateLastNotification={this.props.updateLastNotification} />
                </Menu.Item>
            </Menu>
        );
    }
}
