import React from 'react';
import {Card, Tag} from 'antd';
import { TableWithMessage } from '../../../Tables';
import { getTableDateProps } from '../../../Tables/TableColumn';
import { formatDMEItem } from '../Manager/components/EquipmentList/components/Item';
import SettingsDropdown from '../../../UI/SettingsDropdown';
import { DmeReferralManagerButton } from './components/Buttons/components/Manager';
import DmeReferralsDeleteButton from './components/Buttons/containers/Delete';

const subColumns = [
    {
        title: 'Title',
        key: 'title',
        render: (info) => {
            return formatDMEItem(info);
        },
    },
    {
        title: '',
        dataIndex: 'dmeEquipmentStatus',
        key: 'status',
        width: 200,
        render: (dmeReferralStatus) => {
            return <Tag>{dmeReferralStatus}</Tag>
        },
    },
    {
        title: '',
        key: 'act',
        width:40,
        render: (info) => {
            return null
        }
    }
];


const DmeReferrals = props => {
    const {dmeReferrals=[], total, loading} = props;
    // console.log(props);
    
    const columns = [
        // {
        //     title: 'Title',
        //     key: 'user',
        //     // render: (user) => {
        //     //     return <AvatarWithName user={user} />
        //     // },
        // },
        {
            title: 'Added',
            key: 'date',
            ...getTableDateProps('createdOn'),
            width: ''
        },
        {
            title: 'Status',
            dataIndex: 'dmeReferralStatus',
            key: 'status',
            width: 200,
            render: (dmeReferralStatus) => {
                return <Tag>{dmeReferralStatus}</Tag>
            },
        },
        {
            title: '',
            key: 'act',
            width:50,
            render: (info) => {
                const items = [
                    {key:'edit', content:  <DmeReferralManagerButton button={false} label={'Edit'} dmeReferral={info} asMenuItem />},
                    {key:'delete', content: <DmeReferralsDeleteButton dmeReferral={info} refetch={props.refetch} asMenuItem />}
                ];
                return <SettingsDropdown items={items} />
            }
        }
    ];
    
    const pageOpts = {
        //onChange: changePage,
        total: total,
        hideOnSinglePage: true
    };
    return (<Card type="table" >
        <TableWithMessage
        emptyMessage={'No Referrals'}
        size="middle" 
        expandedRowRender={info => {
            // console.log(info);
            let dataSource = [];
            const {getAttachments} = info;
            // format attachments into lines
            getAttachments.forEach(attachment => {
                const {equipments} = attachment.object || {};
                // console.log(equipments);
                dataSource = [...dataSource, ...equipments];
            });
            // console.log(dataSource);
            return <TableWithMessage dataSource={dataSource} size={'small'} rowKey={'id'} columns={subColumns} pagination={false}  />
        }}
        dataSource={dmeReferrals} rowKey={'id'} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default DmeReferrals;