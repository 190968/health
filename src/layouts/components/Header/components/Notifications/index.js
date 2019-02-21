import React from 'react';
import { withRouter } from 'react-router-dom'
import moment from 'moment';


import InfiniteScroll from 'react-infinite-scroller';


import { Popconfirm, Row, Col,Button, List, Spin, Icon,} from 'antd';
import Loading, { EmptyList } from '../../../../../components/Loading';
import Avatar from '../../../../../routes/User/components/Avatar';
import { NotificationListItem } from './containers/NotificationListItem';


const Notifications = props => {
        const { loading, notifications=[], hasMore, handleInfiniteOnLoad, handleNotification } = props;
        // console.log(props);
        // if (loading) {
        //     return <Loading />;
        // }
        if (notifications.length === 0) {
            if (loading) {
                return <Loading />;
            } else {
                return <EmptyList>No notifications</EmptyList>;
            }
        }
        // console.log(props.activeUser, 'ActiveUser');
        const canReport = false;
        return (
            <div className="infinite-container">
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={handleInfiniteOnLoad}
                hasMore={!loading && hasMore}
                useWindow={false}
            >
                <List
                    dataSource={notifications}
                    renderItem={notification => (
                        <NotificationListItem canReport={canReport} notification={notification} />
                    )}
                />
                {loading && <Spin className="demo-loading" indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />}
            </InfiniteScroll>
            </div>
        );
}


export default (Notifications);