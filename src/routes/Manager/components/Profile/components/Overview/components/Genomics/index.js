import React from 'react';
import {Card, Table} from 'antd';
import EllipsisText from 'react-ellipsis-text';

export const UserActionPlansTable = props => {


    const {items=[{id:1, title:'EHFR'}, {id:1, title:'ALK'}], loading=false} = props;
    const total = items.length;
    const columns = [{
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (title, info) => {
            return title;
        },
    },

    ];
    const dataSource = items.map((info, i) => {
        //const {id, plan} = info;

        return {...info, key:i};
    });
    const pageOpts = {
        //onChange: changePage,
        pageSize:5,
        total: total,
        hideOnSinglePage: true
    };
    return (<Card type="basic  ant-card-type-table" title={'Genomics '+ (total > 0 ? ' ('+total+')' : '')} >
        <Table size="middle" dataSource={dataSource} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default UserActionPlansTable;