import React from 'react';
import {Input, Table, Radio, Card, Icon,Button,Tooltip} from 'antd';
import moment from 'moment';
import { PageHeaderLayout } from '../../../../../../components/Layout/PageHeaderLayout';
import sort from '../../../../../../components/Tables/sort';
import StaffMemberInviteButton from '../../containers/StaffMemberInviteButton';
import { TableFooterButtons } from '../../../../../../components/Tables/TableFooterButtons';
import { AvatarWithName } from '../../../../../User/components/AvatarWithName';
import { FormattedMessage } from 'react-intl';
import DefaultI18nEn from '../../../../../../i18n/en';
import { CardExtraItems } from '../../../../../../components/Card/components/CardExtraSplit';
import { CardQuickFilter } from '../../../../../../components/Card/components/CardQuickFilter';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


const filters = [
    { value: 'active', label: <FormattedMessage {...DefaultI18nEn.filterActive} /> },
    { value: 'pending', label: <FormattedMessage {...DefaultI18nEn.filterPending} /> },
    { value: 'suspended', label: <FormattedMessage {...DefaultI18nEn.filterSuspended} /> },
    { value: 'archived', label: <FormattedMessage {...DefaultI18nEn.filterArchived} /> }
];

const SupportStaff = props => {
    const {management = [],totalCount,selectedObj,loadByStatus,openModal,searchText,onSearch,emitEmpty, selectedCount, showButton, openShowButton, hideShowButton, visibleModal, hideModal, loading = false} = props;
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
            title: 'Position',
            dataIndex: 'roleTitle',
            key: 'roleTitle',
            render: (roleTitle) => {
                return roleTitle
            },
            sorter: (a, b) => a.roleTitle - b.roleTitle,
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
            title: 'Last Login',
            dataIndex: 'lastLoginDate',
            key: 'lastLoginDate',
            render: (lastLoginDate) => {
                return moment(lastLoginDate).format('L');
            },
        },

    ];
    const pageOpts = {
        pageSize: 20,
        total: totalCount,
        hideOnSinglePage: true
    };
   


const actions = <CardExtraItems>
<CardQuickFilter size={'default'} filters={filters} value={props.status || 'active'} onChange={props.loadByStatus} />
<StaffMemberInviteButton role={'support'} />
</CardExtraItems>

    const rowSelection = {
        onChange: (record,data) => (
            record.length < 1 ? hideShowButton() : openShowButton(data)

        ),
        getCheckboxProps: record => ({
            name: record.name,
        }),
    };
    return (
        <PageHeaderLayout title={'Support Staff ' + (totalCount > 0 ? ' (' + totalCount + ')' : '')}
                          content=""
                          action={actions}
        >

            <Card type="basic1  ant-card-type-table">
                <Table rowSelection={rowSelection} size="middle" dataSource={management} rowKey={'id'} columns={columns}
                       pagination={pageOpts} loading={loading}/>
                {showButton && <TableFooterButtons selectedObj={selectedObj} selectedCount={selectedCount}/>}
            </Card>
        </PageHeaderLayout>
    );
}
 

export default (SupportStaff);