import React from 'react';
import {Card, Table} from 'antd';
import moment from 'moment';
import Truncate from 'react-truncate';
import { Loading } from '../../../../../../../../components/Loading';
import OutreachManagerButton from './components/Manager/components/Button';
import {OutreachDeleteButton} from './components/Manager/containers/DeleteButton';
import SettingsDropdown from '../../../../../../../../components/UI/SettingsDropdown';
import AvatarList from '../../../../../../../../components/UI/AvatarList';
 
export const Outreach = props => {

    const {items=[], user, total=0, loading=false, title="", type} = props;

    if (loading) {
        return  <Loading />
    }
    const columns = [{
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width:100,
        render: (createdDate) => {
            return moment(createdDate).format('L')
        },
    },
    {
        title: 'Subject',
        dataIndex: 'subject',
        key: 'subject',
    },
    {
        title: 'Participants',
        dataIndex: 'participants',
        key: 'participants',
        render: (participants) => {
            return <AvatarList users={participants} />
        },
    },
    {
        title: '',
        key: 'act',
        width:50,
        render: (info) => {
            const items = [
                {key:'edit', content: <OutreachManagerButton user={user} outreach={info} asMenuItem />},
                {key:'delete', content: <OutreachDeleteButton user={user} outreach={info} onDelete={props.refetch} asMenuItem />}
            ];
            return <SettingsDropdown items={items} />
        }
    },
    ];
    const dataSource = items.map((items, i) => {
        return {...items, key:i};
    });
    const pageOpts = {
        //onChange: changePage,
        pageSize:20,
        total: total,
        hideOnSinglePage: true
    };
    return (<Card type="table" title={'Outreach '+ (total > 0 ? ' ('+total+')' : '')} extra={<OutreachManagerButton user={user} onCreate={props.refetch} />} >
        <Table size="middle" dataSource={dataSource} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default Outreach;