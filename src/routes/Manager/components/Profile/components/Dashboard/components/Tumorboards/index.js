import React from 'react';
import {Card, Table} from 'antd';
import moment from 'moment';
import { EmptyList } from '../../../../../../../../components/Loading';

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
        {
            title: 'Date',
            dataIndex: 'startDate',
            key: 'startDate',
            width:100,
            render: (createdDate) => {
                return moment(createdDate).format('L')
            },
        }

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
    return <Card type="table" title={'Tumor Boards '+ (total > 0 ? ' ('+total+')' : '')} >
            {total.length > 0 ? (
            <Table size="middle" dataSource={dataSource} columns={columns} pagination={pageOpts} loading={loading} />)
             : <EmptyList>No Tumorboards</EmptyList>}
        </Card>
}

export default Tumorboards;