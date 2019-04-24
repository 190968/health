import React from 'react';
import {Input, Table, Radio, Card,Icon,Button,Tooltip} from 'antd';

import { PageHeaderLayout } from '../../../../../../components/Layout/PageHeaderLayout';
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";
import sort from '../../../../../../components/Tables/sort';
import StaffMemberInviteButton from '../../containers/StaffMemberInviteButton';
import { TableFooterButtons } from '../../../../../../components/Tables/TableFooterButtons';
import { TableWithMessage } from '../../../../../../components/Tables';
import { FormattedMessage } from 'react-intl';
import DefaultI18nEn from '../../../../../../i18n/en';
import { CardExtraItems } from '../../../../../../components/Card/components/CardExtraSplit';
import { CardQuickFilter } from '../../../../../../components/Card/components/CardQuickFilter';


const filters = [
    { value: 'active', label: <FormattedMessage {...DefaultI18nEn.filterActive} /> },
    { value: 'pending', label: <FormattedMessage {...DefaultI18nEn.filterPending} /> },
    { value: 'suspended', label: <FormattedMessage {...DefaultI18nEn.filterSuspended} /> },
    { value: 'archived', label: <FormattedMessage {...DefaultI18nEn.filterArchived} /> }
];

const Supervisors = props => {
    const {management = [],loadByStatus,totalCount,selectedObj, openModal,searchText,onSearch,emitEmpty, selectedCount, showButton, openShowButton, hideShowButton, visibleModal, hideModal, loading = false} = props;
    const suffix = searchText ? <Icon type="close-circle-o" onClick={emitEmpty}/> : <Icon type="search"/>
    const columns = [{
        title: 'Name',
        dataIndex: 'user',
        key: 'user',
        render: (user) => {
            console.log(user);
            return <AvatarWithName user={user}/>
        },
        sorter: (a, b) => sort(a.user, b.user, "fullName"),
        filterDropdown: (
                
            <Input
                suffix={suffix}
                // ref={ele => this.searchInput = ele}
                placeholder="Search"
                value={searchText}
                onChange={onSearch}
                onPressEnter={onSearch}
            />
    ),
    filterIcon: <Icon type="search"/>,
    },
        {
            title: 'Phone',
            dataIndex: 'user',
            key: 'phone',
            render: (user) => {
                return user.phone.number;
            },
        },
        {
            title: '# of CMs',
            dataIndex: 'getTotalCareManagers',
            key: 'getTotalCareManagers',
            render: (getTotalCareManagers) => {
                return getTotalCareManagers
            },
            sorter: (a, b) => a.getTotalCareManagers - b.getTotalCareManagers,
        },
        {
            title: '# of Patients',
            dataIndex: 'getTotalPatients',
            key: 'getTotalPatients',
            render: (getTotalPatients) => {
                return getTotalPatients
            },
            sorter: (a, b) => a.getTotalPatients - b.getTotalPatients,
        },

    ];
    const pageOpts = {
        pageSize: 20,
        total: totalCount,
        hideOnSinglePage: true
    };
    


const actions = <CardExtraItems>
<CardQuickFilter size={'default'} filters={filters} value={props.status || 'active'} onChange={props.loadByStatus} />
<StaffMemberInviteButton role={'supervisor'} />
</CardExtraItems>

    const rowSelection = {
        onChange: record => (
            record.length < 1 ? hideShowButton() : openShowButton(record)

        ),
        getCheckboxProps: record => ({
            name: record.name,
        }),
    };
    return (
        <PageHeaderLayout title={'Supervisors' + (totalCount > 0 ? ' (' + totalCount + ')' : '')}
                          content=""
                          action={actions}
        >

            <Card type="basic1  ant-card-type-table">
                <TableWithMessage
                emptyMessage={'No Supervisors'}
                rowSelection={rowSelection} size="middle" dataSource={management} rowKey={'id'} columns={columns}
                       pagination={pageOpts} loading={loading}/>
                {showButton && <TableFooterButtons selectedObj={selectedObj} selectedCount={selectedCount}/>}
            </Card>
        </PageHeaderLayout>
    );
}
 

export default (Supervisors);