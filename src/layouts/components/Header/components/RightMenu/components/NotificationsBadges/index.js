import React from 'react'
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
import Notifications from '../../../../containers/Notifications'

import {Tabs, Popover, Icon,  Badge } from 'antd';
import { AccountTasks } from '../../../../containers/Tasks';
const TabPane = Tabs.TabPane;

const NotificationsBadges = props => {
    const {isToggled, toggleState, activeTab, setActiveTab} = props;
    const {criticalTotal=0, notCriticalTotal=0, currentUser} = props;
    const notificationsTotal = notCriticalTotal +  criticalTotal;
    const {currentRole} = currentUser || {};
    // const unreadNotifications = this.state.totalNewNotifications;
    //console.log(newNotificationsNum);
    let content;
    if (currentRole === 'patient') {
        content = (<div style={{width: 336}}>
            <Notifications excludeCritical /*lastCursor={this.props.lastCursor} handleTotalNewNotifications={this.handleTotalNewNotifications}*/ />
            </div>);
    } else {
        content = (
            <Tabs activeKey={activeTab || 'alerts'} onChange={setActiveTab} size={'small'} style={{width: 336}} tabBarGutter={0} tabPosition="top">
                <TabPane tab={<>Critical <Badge count={criticalTotal} /></>} key="alerts">
                    {(!activeTab || activeTab === 'alerts') && <Notifications criticalOnly  /*lastCursor={this.props.lastCursor} handleTotalNewNotifications={this.handleTotalNewNotifications}*/ />}
                </TabPane>
                <TabPane tab={<>Notifications <Badge count={notCriticalTotal} /></>} key="notf">
                    {activeTab == 'notf' && <Notifications excludeCritical /*lastCursor={this.props.lastCursor} handleTotalNewNotifications={this.handleTotalNewNotifications}*/ />}
                </TabPane>
                <TabPane tab="Tasks" key="tasks">
                    {activeTab == 'tasks' && <AccountTasks />}
                </TabPane>
            </Tabs>
        );
    }
    

    return (
        <Popover placement="bottomRight" content={content} getPopupContainer={triggerNode => triggerNode.parentNode} 
                 visible={isToggled}
                 onVisibleChange={toggleState}
                 trigger="click" style={{width: 336}}>
             <Badge count={notificationsTotal} overflowCount={999}><Icon type="bell" /></Badge>
        </Popover>
    );
}
//  class RightMenu extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             visible: false,
//             totalNewNotifications:props.totalNewNotifications,
//             newNotificationsNum:props.newNotificationsNum
//         };
//     }
//     static defaultProps = {
//         lastCursor: '',
//         loading:true
//     }

//      handleVisibleChange = (visible) => {
//          this.setState({ visible });
//      }

//      handleTotalNewNotifications = (totalNewNotifications) => {
//          this.setState({ totalNewNotifications });
//      }

     

    
//     render() {
        
//     }
// }

export default NotificationsBadges;
