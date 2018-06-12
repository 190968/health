import React from 'react';
import {Card, Table} from 'antd';
import EllipsisText from 'react-ellipsis-text';

export const TasksList = props => {

    const {tasks=[], loading=false} = props;
    const total = tasks.length;
    const columns = [{
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (title, info) => {
            return <EllipsisText text={title} length={45}  />
        },
    },

    ];
    const dataSource = tasks;
    const pageOpts = {
        //onChange: changePage,
        pageSize:5,
        total: total,
        hideOnSinglePage: true
    };
    return (<Card type="basic  ant-card-type-table" title={'Tasks '+ (total > 0 ? ' ('+total+')' : '')} >
        <Table size="middle" dataSource={dataSource}  rowKey={'id'} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default TasksList;