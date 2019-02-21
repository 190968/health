import React from 'react';
import { Card, Progress, Rate, Tag } from 'antd';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import ProgramManagerButton from '../Buttons/components/Manage';
import ProgramDeleteButton from '../Buttons/containers/Delete';
import ProgramViewButton from '../Buttons/components/View';
import { TableWithMessage } from '../../../../../../components/Tables';
import SettingsDropdown from '../../../../../../components/UI/SettingsDropdown';
import { getTableDateProps } from '../../../../../../components/Tables/TableColumn';
 

 
const ProgramsTable = props => {
    const { programs:dataSource, total, loading} = props; 

    let columns = [{
        title: 'Name',
        dataIndex: 'title',
        key: 'name',
        render: (title, info) => {
            return <ProgramViewButton program={info} button={false} />
        }
    },
    {
        title: "Categories",
        dataIndex: 'categories',
        key: 'categories',
        width:150,
        render: (categories) => {
            return categories.map(c => <Tag key={c.name}>{c.name}</Tag>)
        },
    },
        {
            title: "Type",
            dataIndex: 'typeText',
            key: 'typeText',
        },
        {
            title: "Referrals",
            dataIndex: 'getReferralsCount',
            align:'right',
            key: 'getReferrals',
            // sorter: (a, b) => a.getReferrals -b.getReferrals,
        },
        {
            title: "Reviews",
            // dataIndex: 'getReviews',
            key: 'getReviews',
            render: () => {
                return <Rate disabled defaultValue={5} />
            },
        },

    //   {
    //     title: 'Status',
    //     dataIndex: 'status',
    //     key: 'status',
    //     render: status => <StatusTag status={status} />
    //   },
    //   {
    //         title: 'Created',
    //         key: 'createdOn',
    //         ...getTableDateProps('createdOn'),
    //     },
        {
            title: '',
            key: 'act',
            width:50,
            render: (info) => {
                const items = [
                    {key:'edit', content:  <ProgramManagerButton button={false} label={'Edit'} program={info} asMenuItem />},
                    {key:'delete', content: <ProgramDeleteButton  program={info} refetch={props.refetch} asMenuItem />}
                ];
                return <SettingsDropdown items={items} />
            }
        }];
    return <TableWithMessage
        emptyMessage={'No Programs added'}
        dataSource={dataSource} 
        columns={columns}
        onChange={props.handleTableChange}
        loading={loading}
        total={total}
        rowKey={'id'}
        />
}

export default ProgramsTable;