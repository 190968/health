import React from 'react';
import {Card, Table} from 'antd';
import moment from 'moment';
import SettingsDropdown from '../../../../../../components/UI/SettingsDropdown';
import { VisitDeleteButton } from './components/VisitManager/containers/DeleteButton';
export const VisitsTable = props => {

    const {visits=[], total=0, user, loading=false} = props;
    const columns = [
        {
            title: 'Subjective',
            dataIndex: 'subjective',
            key: 'title',
            //sorter: (a, b) => sort(a,b,"cohort","title"),
        },
        {
            title: 'Date',
            dataIndex: 'dateTime',
            key: 'date',
            render: (date) => {
                return moment(date).format('L')
            },
            sorter: (a, b) => a.startDate-b.startDate,
        },
        {
            title: 'Time',
            dataIndex: 'dateTime',
            key: 'time',
            render: (date) => {
                return moment(date).format('LT')
            },
            sorter: (a, b) => a.startDate-b.startDate,
        },
       
        {
            title: '',
            key: 'act',
            width:50,
            render: (date, info) => {
                const items = [
                    // {key:'edit', content:  <TransitionManagerButton user={user} transition={info} asMenuItem />},
                    {key:'delete', content: <VisitDeleteButton user={user} visit={info} onDelete={props.refetch} asMenuItem />}
                ];
                return <SettingsDropdown items={items} />
            }
        },
        // {
        //     title: '',
        //     key: 'act',
        //     width:50,
        //     render: (date, info) => {
        //         const items = [{key:'edit', content:'Edit'}];
        //         return <SettingsDropdown items={items} />
        //     }
        // },

    ];
    const pageOpts = {
        //onChange: changePage,
        total: total,
        hideOnSinglePage: true
    };
    return (<Card type="table" title={'Visits '+ (total > 0 ? ' ('+total+')' : '')} >
        <Table size="middle" dataSource={visits} rowKey={'id'} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default VisitsTable;