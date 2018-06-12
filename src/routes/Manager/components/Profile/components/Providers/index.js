import React from 'react';
import {Card, Table} from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";

export const UserProvidersTable = props => {

    const {providers=[], loading=false} = props;
    const total = providers.length;
    const columns = [{
        title: 'Name',
        key: 'title',
        render: (info) => {
            return <Truncate lines={1} >{info.provider.name}</Truncate>
        },
    },
        {
            title: 'Added',
            key: 'sender',
            render: (info) => {
                return <AvatarWithName user={info.sender} />
            },
        },
        {
            title: 'On',
            dataIndex: 'joinedDate',
            key: 'joinedDate',
            render: (date) => {
                return moment(date).format('L')
            },
        },

    ];
    const dataSource = providers;
    const pageOpts = {
        //onChange: changePage,
        pageSize:5,
        total: total,
        hideOnSinglePage: true
    };
    return (<Card type="basic  ant-card-type-table" title={'Providers '+ (total > 0 ? ' ('+total+')' : '')} >
        <Table size="middle" dataSource={dataSource} rowKey={'id'} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default UserProvidersTable;