import React from 'react';
import {Card, Table} from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';
import sort from '../../../../../../components/Tables/sort';
import SettingsDropdown from '../../../../../../components/UI/SettingsDropdown';
import AvatarWithName from '../../../../../User/components/AvatarWithName';
import TransitionManagerButton from './components/TransitionManager/components/Button';
import { TransitionDeleteButton } from './components/TransitionManager/containers/DeleteButton';
export const TransitionsTable = props => {

    const {transitions=[], total=0, user, loading=false} = props;
    const columns = [
        {
            title: 'Date',
            dataIndex: 'dateTime',
            key: 'date',
            render: (date) => {
                return moment(date).format('L')
            },
            // sorter: (a, b) => a.dateTime-b.dateTime,
        },
        {
            title: 'Time',
            dataIndex: 'dateTime',
            key: 'time',
            render: (date) => {
                return moment(date).format('LT')
            },
            // sorter: (a, b) => a.startDate-b.startDate,
        },
        {
            title: 'Event',
            dataIndex: 'typeTxt',
            key: 'title',
            //sorter: (a, b) => sort(a,b,"cohort","title"),
        },
        {
            title: 'Entered by',
            dataIndex: 'createdBy',
            key: 'createdBy',
            render: (info) => {
                return info && <AvatarWithName user={info} />
            },
        },
       
        {
            title: '',
            key: 'act',
            width:50,
            render: (date, info) => {
                const items = [
                    {key:'edit', content:  <TransitionManagerButton user={user} transition={info} asMenuItem />},
                    {key:'delete', content: <TransitionDeleteButton user={user} transition={info} onDelete={props.refetch} asMenuItem />}
                ];
                return <SettingsDropdown items={items} />
            }
        },

    ];
    const pageOpts = {
        //onChange: changePage,
        total: total,
        hideOnSinglePage: true
    };
    return (<Card type="table" title={'Transitions '+ (total > 0 ? ' ('+total+')' : '')} extra={<TransitionManagerButton user={user} refetch={props.refetch} asMenuItem />} >
        <Table
         size="middle" dataSource={transitions} rowKey={'id'} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default TransitionsTable;