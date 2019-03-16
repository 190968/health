import { Badge, Icon, Menu } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeaderFollowUp } from '../../../../containers/FollowUp';
import { GlobalSearch } from '../../../../containers/GlobalSearch';
import HeaderPoints from '../../containers/HeaderPoints';
import NotificationsBadges from '../../containers/NotificationsBadges';
import './index.less';

const MenuBadges = props => {
    
    const {unreadMessages, loading, lastNotificationCursor, newCursor, currentUser} = props;
    const {criticalTotal, notCriticalTotal} = props;
    const {currentRole} = currentUser || {};
    // first call - lastNotification - empty, but lastCursor has value. It means that we can load the notifications
    const loadNew = !loading && lastNotificationCursor !== newCursor;
    return (
        <Menu
            selectedKeys={['1']}
            mode="horizontal"
            className={'ant-menu-thin'}
            style={{'borderBottom':'none', 'float':'right', 'lineHeight':'49px'}}
        >
        {currentRole !== 'patient' &&  <Menu.Item key='followup'><HeaderFollowUp /></Menu.Item>}
            <Menu.Item key='search'>
                {currentRole === 'patient' ? <HeaderPoints /> : <GlobalSearch />}
            </Menu.Item>
            <Menu.Item key='inbox'>
                <NavLink to="/messages"><Badge count={unreadMessages}><Icon type="mail" /></Badge></NavLink>
            </Menu.Item>
            {/*<Menu.Item key='points'>
                <Popover content={content} title='250 points'  >
                    <Link to="/motivation"> <Icon type="star-o" /></Link>
                </Popover>
            </Menu.Item>*/}

            <Menu.Item key='notifications'>
                <NotificationsBadges 
                    criticalTotal={criticalTotal}
                    notCriticalTotal={notCriticalTotal}  
                    loadNew={loadNew} 
                    newCursor={newCursor}
                    lastCursor={lastNotificationCursor}
                    updateLastNotification={props.updateLastNotification}
                    currentUser={currentUser}
                 />
            </Menu.Item>
        </Menu>
    );
}

export default MenuBadges;
