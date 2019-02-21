import React from 'react';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';

import { Popconfirm, Row, Col,Button, List, Spin, Icon,} from 'antd';
import Loading, { EmptyList } from '../../../../../components/Loading';
import Avatar from '../../../../../routes/User/components/Avatar';
import TaskListItem from '../../../../../components/Tasks/components/TaskLineItem';


const Tasks = props => {
 
        const { loading, tasks=[], hasMore, handleInfiniteOnLoad, handleNotification } = props;
        if (loading) {
            return <Loading />;
        }
        if (tasks.length === 0) {
            return <EmptyList>No Tasks</EmptyList>
        }
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
                    itemLayout="vertical"
                    dataSource={tasks}
                    renderItem={task => {
                        return <TaskListItem key={task.id} task={task} />;
                    }}
                />
                {loading && <Loading />}
            </InfiniteScroll>
            </div>
        );
}

export default Tasks;