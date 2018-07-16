import React from 'react';
import {Row, Col, Input, Table, Radio, Card, Menu, Icon, Divider, Alert, Button, Dropdown, Tooltip} from 'antd';
import {NavLink} from 'react-router-dom';
import moment from 'moment';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
import {AvatarWithName} from "../../../User/components/AvatarWithName/index";
import NetworkManagerr from "./containers/NetworkManager";
import InviteButton from "../../../../components/Tables/InviteButton/index";
import sort from '../../../../components/Tables/sort';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


const NetworkManager = props => {
    const {management = [],loadByStatus,selectedObj,totalCount, openModal,searchText,onSearch,emitEmpty, selectedCount, showButton, openShowButton, hideShowButton, visibleModal, visibleInviteModal, openInviteModal, hideInviteModal, hideModal, loading = false} = props;
   console.log(props);
    const suffix = searchText ? <Icon type="close-circle-o" onClick={emitEmpty}/> : <Icon type="search"/>
    const columns = [{
        title: 'Name',
        dataIndex: 'user',
        key: 'user',
        render: (user) => {
            return <AvatarWithName user={user}/>
        },
        sorter: (a, b) => sort(a.user, b.user, "fullName"),
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
               // filterDropdownVisible: this.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) =>   this.searchInput.focus()
    },
        {
            title: 'Joined',
            dataIndex: 'joinedDate',    
            key: 'joinedDate',
            render: (joinedDate) => {
                return moment(joinedDate).format('L')
            },
            sorter: (a, b) => (moment(a.joinedDate) - moment(b.joinedDate))
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
                return moment(lastLoginDate).format('L')
            },
        },
        {
            title: 'Access Level',
            dataIndex: 'accessLevel',
            key: 'accessLevel',
            render: (accessLevel) => {
                return accessLevel;
            },
            filters: [{
                text: 'Limited',
                value: 'Limited',
            }, {
                text: 'Full Access',
                value: 'Full Access',
            }],
            onFilter: (value, record) => record.accessLevel.indexOf(value) === 0,
        },

    ];
    const pageOpts = {
        pageSize: 20,
        total: totalCount,
        hideOnSinglePage: true
    };
    const rowSelection = {
        onChange: (record,data) => (
            console.log(record,data),
            record.length < 1 ? hideShowButton() : openShowButton(data)

        ),
        getCheckboxProps: record => ({
            name: record.name,
        }),
    };
    const actions = <React.Fragment>
        <RadioGroup defaultValue="active" style={{marginRight: 10}}>
            <RadioButton value="active" onClick={loadByStatus}>Active</RadioButton>
            <RadioButton value="pending" onClick={loadByStatus}>Pending</RadioButton>
        </RadioGroup>
        <Tooltip title="Invite"><Button onClick={openModal} type="primary"><Icon type="plus"/></Button></Tooltip>
    </React.Fragment>;

    return (
        <PageHeaderLayout title={'Network Managers ' + (totalCount > 0 ? ' (' + totalCount + ')' : '')}
                          action={actions}
        >

            <Card type="basic1  ant-card-type-table">
                <Table rowSelection={rowSelection} size="middle" dataSource={management} columns={columns}
                       pagination={pageOpts} loading={loading}/>
                {showButton && <InviteButton selectedObj={selectedObj} selectedCount={selectedCount}/>}
            </Card>
            {visibleModal && <NetworkManagerr onHide={hideModal}/>}
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
    }),
);

export default enhance(NetworkManager);