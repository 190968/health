import React from 'react';
import {Card, Table} from 'antd';
import EllipsisText from 'react-ellipsis-text';

export const HealthItemsTable = props => {

    const {items=[], total=0, loading=false, title=""} = props;
    const columns = [{
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (title, info) => {
            return <EllipsisText text={title} length={45}  />;
        },
    },

    ];
    const dataSource = items.map((items, i) => {
        return {...items, key:i};
    });
    const pageOpts = {
        //onChange: changePage,
        pageSize:5,
        total: total,
        hideOnSinglePage: true
    };
    return (<Card type="basic  ant-card-type-table" title={title+' '+ (total > 0 ? ' ('+total+')' : '')} >
        <Table size="middle" dataSource={dataSource} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default HealthItemsTable;