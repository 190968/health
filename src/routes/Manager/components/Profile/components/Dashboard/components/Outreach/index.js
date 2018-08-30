import React from 'react';
import {Card, Table} from 'antd';
import moment from 'moment';
import Truncate from 'react-truncate';
import { Loading } from '../../../../../../../../components/Loading';
 
export const Outreach = props => {

    const {items=[], total=0, loading=false, title="", type} = props;

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
            var users =  participants.map(participant => {
                return participant.fullName;
            });//.split(',');
                //console.log(users);
            return users.join(', ');
        },
    }
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
    return (<Card type="  ant-card-type-table" title={'Outreach '+ (total > 0 ? ' ('+total+')' : '')} >
        <Table size="middle" dataSource={dataSource} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default Outreach;