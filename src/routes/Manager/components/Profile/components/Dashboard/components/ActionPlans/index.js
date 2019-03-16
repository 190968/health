import React from 'react';
import {Link} from 'react-router-dom';
import {Card, Table} from 'antd';
import moment from 'moment';
import Truncate from 'react-truncate';
import SettingsDropdown from '../../../../../../../../components/UI/SettingsDropdown';
import { UserPlanDeleteButton } from '../../../../../../../Plan/components/Buttons/containers/UserPlanDeleteButton';
import TaskAssignButton from '../../../../../../../../components/Tasks/components/TaskAssignButton';
import { PlanI18nEn as messages } from '../../../../../../../Plan/i18n/en';
import { FormattedMessage } from 'react-intl';
import { CardExtras } from '../../../../../../../../components/Card';
import AvatarWithName from '../../../../../../../User/components/AvatarWithName';
import { getTableDateProps } from '../../../../../../../../components/Tables/TableColumn';

export const UserActionPlansTable = props => {

    const {plans=[], user, status, refetch, loading=false} = props;
    const total = plans.length;
    const columns = [{
        title: 'Title',
        key: 'title',
        render: (info) => {
            return <Link to={'/plan/'+info.plan.id} style={{width:'100%', display:'inline-block'}}><Truncate >{info.plan.title}</Truncate></Link>;
        },
    },
    ];
    switch(status) {
        default:
            columns.push({
                title: 'Start Date',
                key: 'startDate',
                ...getTableDateProps('startDate'),
            });

            columns.push({
                title: 'Last Used',
                key: 'lastUsedDate',
                ...getTableDateProps('lastUsedDate'),
            });
        
            break;
        case  'elapsed':
        columns.push({
            title: 'End Date',
            key: 'endDate',
            ...getTableDateProps('endDate'),
        });
        
        break;
        case  'pending':
            columns.push({
                title: 'Sender',
                dataIndex: 'sender',
                key: 'sender',
                render: (user) => {
                    return <AvatarWithName user={user} />
                },
            });
            columns.push({
                title: 'Invited',
                key: 'invitationDate',
                ...getTableDateProps('invitationDate'),
            });
            break;
        case  'archived':
            columns.push({
                title: 'Archived',
                dataIndex: 'deletedBy',
                key: 'deletedBy',
                render: (user) => {
                    return <AvatarWithName user={user} />
                },
            });
            columns.push({
                title: 'On',
                key: 'deletedDate',
                ...getTableDateProps('deletedDate'),
            });
            break;
        case  'completed':
            columns.push({
                title: 'Completed',
                dataIndex: 'completedBy',
                key: 'completedBy',
                render: (user) => {
                    return <AvatarWithName user={user} />
                },
            });
            columns.push({
                title: 'On',
                key: 'completedDate',
                ...getTableDateProps('completedDate'),
            });
            break;
    }

    columns.push({
        title: '',
        key: 'actions',
        width:50,
        render: (title, info) => {
            const {id, plan} = info;
            let items = [];
            items.push({key:'edit', content: <Link to={'/builder/ap/'+plan.id}>Edit</Link>});
            items.push( {key:'delete', content: <UserPlanDeleteButton asMenuItem userPlan={info} refetch={refetch} />});

            return <SettingsDropdown items={items}  />
        },
    });
    
    const pageOpts = {
        //onChange: changePage,
        pageSize:5,
        total: total,
        hideOnSinglePage: true
    };
    const isSelf = false;
    const assignButton = !isSelf && <CardExtras.Split><TaskAssignButton asPlusIcon patient={user} mode={'simple'} assignObject={{type: 'ap'}} /></CardExtras.Split>;
    


    const filters = [
		{ value: 'active', label: 'Active' },
		{ value: 'completed', label: 'Completed' },
		{ value: 'elapsed', label: 'Elapsed' },
		{ value: 'archived', label: 'Archived' },
		{ value: 'pending', label: 'Pending' }
	];
 
 
    const extra = <React.Fragment>
        <CardExtras.Split>
            <CardExtras.Filters filters={filters} value={status} onChange={props.loadByStatus} />
        </CardExtras.Split>
    
        {assignButton}
    </React.Fragment>;

    return (<Card type="table" title={'ActionPlans '+ (total > 0 ? ' ('+total+')' : '')}  extra={extra}>
            <Table size="middle" rowKey={'id'} dataSource={plans} columns={columns} pagination={pageOpts} loading={loading} />
        </Card>)
}

export default UserActionPlansTable;