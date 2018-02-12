import React from 'react'
import { Link } from 'react-router-dom';
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
import Notification from '../../../../containers/Notifications'

import {Menu, Tabs, Popover, Icon, Avatar, Badge, notification } from 'antd';
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;


 class RightMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    static defaultProps = {
        lastCursor: '',
        loading:true
    }

    /*componentWillReceiveProps(nextProps) {
        console.log(nextProps, 'lastCursor');
        console.log(this.props,'Cur props');
        if (!nextProps.loading && nextProps.lastCursor !== this.props.lastCursor) {
            // update notification
            console.log(nextProps.lastCursor, 'Cursor has been changed');
            console.log(this.props.lastCursor, 'Previous cursor');
            //this.props.updateLastNotification(nextProps.lastCursor);
        }
    }*/

    componentDidUpdate(prevProps) {

        //console.log(prevProps);
        //console.log(this.props);
        if (!this.props.loading) {
            const {newCursor, lastCursor, newNotificationsNum} = this.props;
            if (newCursor && newCursor !== lastCursor) {
                this.props.updateLastNotification(newCursor);

                if (lastCursor !== '') {

                    if (newNotificationsNum > 0) {
                        // if we have 1-2 notification - show them. if we have more than 2, then show general message
                        notification['info']({
                            message: 'New Notifications',
                            description: this.props.intl.formatMessage(messages.newNotifications, {itemCount:newNotificationsNum}),
                        });
                    }
                }
            }




        }
    }
    render() {
        const unreadNotifications = this.props.totalNewNotifications;

        const content = (
            <Tabs defaultActiveKey="1" style={{width: 336}} tabPosition="top">
                <TabPane tab="Notifications" key="1"><Notification lastCursor={this.props.lastCursor} /></TabPane>
                <TabPane tab="Tasks" key="2"><div className="ant-list-empty-text">No tasks</div></TabPane>
            </Tabs>
        );

        return (
            <Popover placement="bottomRight" content={content} trigger="click" style={{width: 336}}>
                <Link to="/notifications"><Badge count={unreadNotifications} overflowCount={999}><Icon type="bell" style={{margin:0}}  /></Badge></Link>
            </Popover>
        );
    }
}

export default injectIntl(RightMenu);
