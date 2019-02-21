import React from 'react';
import {Card, Table, Progress} from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';
import { Link } from 'react-router-dom';
import SettingsDropdown from '../../../../../../../../components/UI/SettingsDropdown';
import { UserPlanDeleteButton } from '../../../../../../../Plan/components/Buttons/containers/UserPlanDeleteButton';
import CardExtras from '../../../../../../../../components/Card';
import { getTableDateProps } from '../../../../../../../../components/Tables/TableColumn';

export const UserActionPlansTable = props => {

    const {plans=[], refetch, loading=false} = props;
    const total = plans.length;
    const columns = [{
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (title, plan) => {
            return <Link to={'/plan/'+plan.id} style={{width:'100%', display:'inline-block'}}><Truncate >{title}</Truncate></Link>
        },
    },
        {
            title: 'Start',
            key: 'startDate',
            className: 'd-none d-lg-table-cell ',
            ...getTableDateProps('startDate'),
        },
        {
            title: 'End',
            key: 'endDate',
            className: 'd-none d-lg-table-cell ',
            ...getTableDateProps('endDate'),
        },
        {
            title: 'Engagement',
            dataIndex: 'adherence',
            width:100,
            // className: 'd-md-none',
            key: 'adherence',
            render: (adherence={}) => {
                const {level} = adherence;
                return level && <Progress percent={level} />;
            },
        },
        {
            title: '',
            key: 'actions',
            width:50,
            render: (title, info) => {
                const {id, plan} = info;
                let items = [];
                //items.push({key:'edit', content: <Link to={'/pb/'+plan.id}>Edit</Link>});
                items.push( {key:'delete', content: <UserPlanDeleteButton asMenuItem userPlan={info} refetch={refetch} />});
    
                return <SettingsDropdown items={items}  />
            },
        },
    ];
    const dataSource = plans.map((info, i) => {
        const {id, plan} = info;

        return {id, title: plan.title, key:i};
    });
    const pageOpts = {
        //onChange: changePage,
        pageSize:5,
        total: total,
        hideOnSinglePage: true
    };

    const filters = [
		{ value: 'active', label: 'Active' },
		// { value: 'completed', label: 'Completed' },
		{ value: 'pending', label: 'Pending' },
		{ value: 'archived', label: 'Archived' }
	];
 
 
    const extra = <React.Fragment>
        <CardExtras.Split>
            <CardExtras.Filters filters={filters} value={props.status} onChange={props.loadByStatus} />
        </CardExtras.Split>
    </React.Fragment>;


    return (<Card type="table" title={'Plans Of Care '+ (total > 0 ? ' ('+total+')' : '')} extra={extra} >
            <Table size="middle" dataSource={dataSource} columns={columns} pagination={pageOpts} loading={loading} />
        </Card>)
}

export default UserActionPlansTable;