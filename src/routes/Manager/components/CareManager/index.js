import React from 'react';
import { Row, Col,Input,Table,Radio, Card,Menu, Icon, Divider, Alert, Button, Dropdown,Tooltip } from 'antd';
import {NavLink} from 'react-router-dom';
import moment from 'moment';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
import {AvatarWithName} from "../../../User/components/AvatarWithName/index";
import CareManagerr from "./containers/CareManager";
import sort from '../../../../components/Tables/sort';
import InviteButton from "../../../../components/Tables/InviteButton/index";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;



const CareManager = props => {
    const {management=[],totalCount,selectedObj,loadByStatus, openModal,searchText,onSearch,emitEmpty,selectedCount,showButton,openShowButton,hideShowButton ,visibleModal,hideModal,loading=false} = props;
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
                ref={ele => this.searchInput = ele}
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
        pageSize:20,
        total: totalCount,
        hideOnSinglePage: true
    };
        const actions = <React.Fragment>
        <RadioGroup defaultValue="all" style={{marginRight:10}} >
            <RadioButton value="active" onClick={loadByStatus}>Active</RadioButton>
            <RadioButton value="pending" onClick={loadByStatus}>Pending</RadioButton>
        </RadioGroup>
        <Tooltip title="Invite"><Button onClick={openModal} type="primary"><Icon type="plus" /></Button></Tooltip>
    </React.Fragment>;
  const rowSelection = {
    onChange:  record => (
        record.length < 1 ? hideShowButton() : openShowButton(record)
        
    ),
    getCheckboxProps: record => ({
        name: record.name,
    }),
};
        return (
                <PageHeaderLayout title={'Care Managers '+ (totalCount > 0 ? ' ('+totalCount+')' : '')}
                content=""
                action={actions}
                >

    <Card type="basic1  ant-card-type-table">
        <Table rowSelection={rowSelection} size="middle" dataSource={management} rowKey={'id'} columns={columns} pagination={pageOpts} loading={loading} />
        {showButton && <InviteButton selectedObj={selectedObj} selectedCount={selectedCount} />}
    </Card>
    {visibleModal && <CareManagerr onHide={hideModal} />}
    </PageHeaderLayout>
            );
    }
    const enhance = compose(
        withState('visibleModal', 'setOpenManager', false),
        withHandlers({
            openModal: props => () => {
                props.setOpenManager(true);
            },
            hideModal: props => () => {
                props.setOpenManager(false);
            }
        })
    );

export default enhance(CareManager);