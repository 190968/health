import React from 'react';
import {Card, Table, Icon} from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";

export const UserFamilyTable = props => {

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
            title: 'Relationship',
            dataIndex: 'roleText',
            key: 'role',
            // render: (info) => {
            //     return info;
            // },
        },
        {
            title: 'Joined',
            dataIndex: 'joinedDate',
            key: 'joinedDate',
            render: (date) => {
                return moment(date).format('L')
            },
        },
        {
            title: 'Can report',
            dataIndex: 'canReport',
            key: 'canReport',
            render: (canReport) => {
                return canReport && <Icon type="check" />;
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
    return (<Card type="basic1  ant-card-type-table" title={'Family Members '+ (total > 0 ? ' ('+total+')' : '')} >
        <Table size="middle" dataSource={dataSource} rowKey={'id'} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default UserFamilyTable;