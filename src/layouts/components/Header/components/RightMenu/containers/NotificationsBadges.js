import NotificationsBadges from '../components/NotificationsBadges';
import {notification } from 'antd';
import messages from '../components/NotificationsBadges/messages';
import { withNotificationsQuery } from '../../../../../../components/Notifications/queries';
import { compose, lifecycle } from 'recompose';
import { injectIntl } from 'react-intl';
import { withToggleState, withTabsState } from '../../../../../../components/Modal';

const enhance = compose(
    withNotificationsQuery,
    injectIntl,
    // lifecycle({
    //     componentWillReceiveProps(nextProps) {
    //         if (!nextProps.loading && nextProps.totalNewNotifications !== this.props.totalNewNotifications) {
    //             this.handleTotalNewNotifications(nextProps.totalNewNotifications);
    //         }
    //     },
    //     componentDidUpdate(prevProps) {
    //         if (!this.props.loading) {
    //             const {newCursor, lastCursor, newNotificationsCount} = this.props;
    
    
    //             if (newCursor && newCursor !== lastCursor) {
    //                 this.props.updateLastNotification(newCursor);
    
    //                 if (lastCursor !== '') {
    
    //                     if (newNotificationsCount > 0) {
    //                         // if we have 1-2 notification - show them. if we have more than 2, then show general message
    //                         notification['info']({
    //                             message: 'New Notifications',
    //                             description: this.props.intl.formatMessage(messages.newNotifications, {itemCount:newNotificationsCount}),
    //                         });
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }),
    withToggleState,
    withTabsState
);

export default enhance(NotificationsBadges);