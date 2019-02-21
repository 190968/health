import React from 'react';
import {Card, Table, Tag} from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";
import sort from '../../../../../../components/Tables/sort'
import Avatar from '../../../../../User/components/Avatar';
import { ProgramsCatalogButton } from './components/Buttons/components/Catalog';
import ProgramsViewButton from './components/Buttons/components/View';
import CardExtras from '../../../../../../components/Card';
import { TableWithMessage } from '../../../../../../components/Tables';

const UserPrograms = props => {

    const {programs=[], user, status, isSelf=false, loading=false,} = props;
    const total = programs.length;
    let columns = [{
        title: 'Name',
        key: 'title',
        render: (info) => {
            return <ProgramsViewButton userProgram={info} program={info.program} patient={user} />
        },
    },
        {
            title: 'Category',
            width:200,
           // dataIndex: 'categories',
            key: 'category',
            render: (info) => {
                const {program} = info;
                const {categories=[]} = program || {};
                return  categories.map(category => <Tag key={category.id} color="blue">{category.name}</Tag>)
            },
        }];

        switch(props.status) {
            default:
            columns.push({
                title: 'Joined',
                dataIndex: 'joinedDate',
                width:120,
                key: 'joinedDate',
                render: (date) => {
                    return moment(date).format('L')
                },
            });
            columns.push({
                title: 'By',
                dataIndex: 'invitedBy',
                key: 'invitedBy',
                width:50,
                render: (user) => {
                    return <Avatar user={user}/>
                },
                // sorter: (a, b) => sort(a,b,"sender"),
            });
            break;
            case 'archived':
                columns.push({
                    title: 'Archived',
                    dataIndex: 'archivedDate',
                    width:120,
                    key: 'archiveddDate',
                    render: (date) => {
                        return moment(date).format('L')
                    },
                });
                columns.push({
                    title: 'By',
                    dataIndex: 'archivedBy',
                    key: 'archivedBy',
                    width:50,
                    render: (user) => {
                        return <Avatar user={user}/>
                    },
                    // sorter: (a, b) => sort(a,b,"sender"),
                });
                break;
            case 'pending':
                columns.push({
                    title: 'Invited',
                    dataIndex: 'invitedDate',
                    width:120,
                    key: 'invitedDate',
                    render: (date) => {
                        return moment(date).format('L')
                    },
                });
                columns.push({
                    title: 'By',
                    dataIndex: 'invitedBy',
                    key: 'invitedBy',
                    width:50,
                    render: (user) => {
                        return <Avatar user={user}/>
                    },
                    // sorter: (a, b) => sort(a,b,"sender"),
                });
                break;
        }
   console.log(programs);
    const pageOpts = {
        //onChange: changePage,
        pageSize:20,
        total: total,
        hideOnSinglePage: true
    };


    const assignButton = !isSelf && <CardExtras.Split><ProgramsCatalogButton patient={user} /></CardExtras.Split>;
	const filters = [
		{ value: 'active', label: 'Active' },
		{ value: 'pending', label: 'Pending' },
		{ value: 'archived', label: 'Archived' }
	];
 
 
    const extra = <React.Fragment>
        <CardExtras.Split>
            <CardExtras.Filters filters={filters} value={status} onChange={props.loadByStatus} />
		</CardExtras.Split>
		{assignButton}
	</React.Fragment>
    return (<Card type="table" title={'Referrals '+ (total > 0 ? ' ('+total+')' : '')} extra={extra} >
        <TableWithMessage
        emptyMessage={'No '+status+' Programs'}
        size="middle" dataSource={programs} rowKey={'id'} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default UserPrograms;