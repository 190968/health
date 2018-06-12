import React from 'react';
import {Card, Table} from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";

export const UserTeamTable = props => {

    const {members:providers=[], loading=false} = props;
    const total = providers.length;
    const columns = [{
        title: 'Name',
        dataIndex: 'user',
        key: 'name',
        render: (user) => {
            return <AvatarWithName user={user} />
        },
    },
        {
            title: 'Role',
            dataIndex: 'roleText',
            key: 'role',
            // render: (info) => {
            //     return info;
            // },
        },
        {
            title: 'On',
            dataIndex: 'joinedDate',
            key: 'joinedDate',
            render: (date) => {
                return moment(date).format('L')
            },
        },
        {
            title: 'Phone',
            dataIndex: 'user',
            key: 'phoneFormatted',
            render: (user) => {
                return user.phoneFormatted;
            },
        },

    ];
    const dataSource = providers;
    const pageOpts = {
        //onChange: changePage,
        pageSize:20,
        total: total,
        hideOnSinglePage: true
    };
    return (<Card type="j  ant-card-type-table" title={'Care Team '+ (total > 0 ? ' ('+total+')' : '')} >
        <Table size="middle" dataSource={dataSource} rowKey={'id'} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default UserTeamTable;