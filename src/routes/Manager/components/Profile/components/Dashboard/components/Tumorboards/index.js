import React from 'react';
import {Card, Table} from 'antd';

const Tumorboards = props => {

    const {items=[], loading=false} = props;
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
    return (<Card type="basic  ant-card-type-table" title={'Tumor Boards '+ (total > 0 ? ' ('+total+')' : '')} >
            <Table size="middle" dataSource={dataSource} columns={columns} pagination={pageOpts} loading={loading} />
        </Card>)
}

export default Tumorboards;