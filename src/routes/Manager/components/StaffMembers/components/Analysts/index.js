import React from 'react';
import {Input,Table,Radio, Card,Icon,Button,Tooltip } from 'antd';
import moment from 'moment';
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";
import sort from '../../../../../../components/Tables/sort';
import StaffMemberInviteButton from '../../containers/StaffMemberInviteButton';
import { PageHeaderLayout } from '../../../../../../components/Layout/PageHeaderLayout';
import { TableFooterButtons } from '../../../../../../components/Tables/TableFooterButtons';
import { CardExtraItems } from '../../../../../../components/Card/components/CardExtraSplit';
import { CardQuickFilter } from '../../../../../../components/Card/components/CardQuickFilter';
import DefaultI18nEn from '../../../../../../i18n/en';
import { FormattedMessage } from 'react-intl';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


const filters = [
    { value: 'active', label: <FormattedMessage {...DefaultI18nEn.filterActive} /> },
    { value: 'pending', label: <FormattedMessage {...DefaultI18nEn.filterPending} /> },
    { value: 'suspended', label: <FormattedMessage {...DefaultI18nEn.filterSuspended} /> },
    { value: 'archived', label: <FormattedMessage {...DefaultI18nEn.filterArchived} /> }
];

const Analysts = props => {
    const {management=[],totalCount,loadByStatus,selectedObj, openModal,searchText,onSearch,emitEmpty,selectedCount,showButton,openShowButton,hideShowButton, visibleModal,hideModal,loading=false} = props;
       const suffix = searchText ? <Icon type="close-circle-o" onClick={emitEmpty}/> : <Icon type="search"/>

    const columns = [{
        title: 'Name',
        dataIndex: 'user',
        key: 'user',
        render: (user) => {
            console.log(user);
            return <AvatarWithName user={user} />
        },
         sorter: (a, b) => sort(a.user,b.user,"fullName"),
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
            title: 'Last Login',
            dataIndex: 'lastLoginDate',
            key: 'lastLoginDate',
            render: (lastLoginDate) => {
                return moment(lastLoginDate).format('L');
            },
        },
    ];
     const pageOpts = {
        pageSize:20,
        total: totalCount,
        hideOnSinglePage: true
    };
    const rowSelection = {
        onChange: (record,data) => (
            record.length < 1 ? hideShowButton() : openShowButton(data)
            
        ),
        getCheckboxProps: record => ({
            name: record.name,
        }),
    };
       


const actions = <CardExtraItems>
<CardQuickFilter size={'default'} filters={filters} value={props.status || 'active'} onChange={props.loadByStatus} />
<StaffMemberInviteButton role={'analyst'} />
</CardExtraItems>
 
        return (
                <PageHeaderLayout title={'Analysts '+ (totalCount > 0 ? ' ('+totalCount+')' : '')}
                content=""
                action={actions}
                >

    <Card type="table">
        <Table rowSelection={rowSelection} size="middle" dataSource={management} rowKey={'id'} columns={columns} pagination={pageOpts} loading={loading} />
        {showButton && <TableFooterButtons selectedObj={selectedObj} selectedCount={selectedCount} />}
    </Card>
    </PageHeaderLayout>
            );
    }
    

export default (Analysts);