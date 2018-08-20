import React from 'react';
import {Input, Table, Radio, Card, Menu, Icon, Dropdown} from 'antd';
import moment from 'moment';
import { PageHeaderLayout } from '../../../../../../components/Layout/PageHeaderLayout';
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";
import sort from '../../../../../../components/Tables/sort';
import StaffMemberInviteButton from '../../containers/StaffMemberInviteButton';
import { TableFooterButtons } from '../../../../../../components/Tables/TableFooterButtons';
import { PatientPasswordButton } from '../../../Patients/components/PatientPasswordButton';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


const NetworkManagers = props => {
    const {management = [],loadByStatus,selectedObj,totalCount, openModal,searchText,onSearch,emitEmpty, selectedCount, showButton, openShowButton, hideShowButton, visibleModal, visibleInviteModal, openInviteModal, hideInviteModal, hideModal, loading = false} = props;
    //console.log("managhement",management);
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
        {
            title: '',
            width: 50,
            render: ({user}) => {
                console.log(user);
                const menu = (
                    <Menu>
                        {/* <Menu.Item key={0} >
                            <PatientEditButton user={info} asMenuItem />
                        </Menu.Item> */}
                        <Menu.Item key={1} >
                            <PatientPasswordButton user={user} asMenuItem />
                        </Menu.Item>
                    </Menu>
                );
                return <Dropdown overlay={menu} trigger={['click']}>
                    <Icon type="setting" />
                </Dropdown>;
            }
        }
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
        <RadioGroup defaultValue="active" style={{marginRight: 10}}  onClick={loadByStatus} >
            <RadioButton value="active"  >Active</RadioButton>
            <RadioButton value="pending" >Pending</RadioButton>
            <RadioButton value="suspended" >Suspended</RadioButton>
            <RadioButton value="archived" >Archived</RadioButton>
        </RadioGroup>
        <StaffMemberInviteButton role={'manager'} />
    </React.Fragment>;

    return (
        <PageHeaderLayout title={'Network Managers ' + (totalCount > 0 ? ' (' + totalCount + ')' : '')}
                          action={actions}
        >

            <Card type="basic1  ant-card-type-table">
                <Table rowSelection={rowSelection} size="middle" dataSource={management} columns={columns}
                       pagination={pageOpts} loading={loading}/>
                {showButton && <TableFooterButtons selectedObj={selectedObj} selectedCount={selectedCount}/>}
            </Card>
        </PageHeaderLayout>
    );
}
 

export default (NetworkManagers);