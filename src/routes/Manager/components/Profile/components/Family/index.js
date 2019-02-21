import React from 'react';
import {Card, Radio, Tooltip, Input, Button, Table, Icon} from 'antd';
import Truncate from 'react-truncate';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import moment from 'moment';
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";
import {PageHeaderLayout} from "../../../../../../components/Layout/PageHeaderLayout/index";
import sort from '../../../../../../components/Tables/sort';
import FamilyManager from './containers/FamilyManager';
import { TableWithMessage } from '../../../../../../components/Tables';
import { FamilyMemberDeleteButton } from './components/FamilyManager/containers/DeleteButton';
import {FamilyManagerButton} from './components/Buttons/components/Manager'
import SettingsDropdown from '../../../../../../components/UI/SettingsDropdown';
import { PhoneFieldView } from '../../../../../../components/FormCustomFields/components/Phone/view';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
export const UserFamilyTable = props => {

    const {members = [], status, user, openModal, searchText, emitEmpty, onSearch, visibleModal, hideModal, loading = false} = props;
    const total = members.length;

    let columns = [];

    if (status === 'pending') {
        columns = [{
            title: 'Name',
            key: 'name',
            render: (info) => {
                const {firstName, lastName} = info;
                return firstName +' '+lastName;
            },
        },{
            title: 'Email',
            dataIndex: 'email',
            key: 'name',
        },
            {
                title: 'Relationship',
                dataIndex: 'roleText',
                key: 'role',
            },
            {
                title: 'Invited',
                dataIndex: 'invitedOn',
                key: 'invitedOn',
                render: (date) => {
                    return moment(date).format('L')
                },
                sorter: (a, b) => a.invitedOn - b.invitedOn,
            },
            {
                title: 'Can report',
                dataIndex: 'canReport',
                key: 'canReport',
                render: (canReport) => {
                    return canReport && <Icon type="check"/>;
                },
            },
            {
                title: '',
                key: 'act',
                width:50,
                render: (date, info) => {
                    const items = [
                        {key:'edit', content:  <FamilyManagerButton user={user} familyMember={info} asMenuItem />},
                        {key:'delete', content: <FamilyMemberDeleteButton user={user} familyMember={info} onDelete={props.refetch} />}
                    ];
                    return <SettingsDropdown items={items} />
                }
                // render: (info) => {
                //     return 
                // }
            },
        ];
    } else {
        columns = [{
            title: 'Name',
            dataIndex: 'user',
            key: 'name',
            render: (user) => {
                return <AvatarWithName user={user}/>
            },
            // sorter: (a, b) => sort(a, b, "name"),
            // filterDropdown: (
            //     <div className="custom-filter-dropdown">
            //         <Input
            //             suffix={suffix}
            //             ref={ele => this.searchInput = ele}
            //             placeholder="Search name"
            //             value={searchText}
            //             onChange={onSearch}
            //             onPressEnter={onSearch}
            //         />
            //     </div>
            // ),
            // filterIcon: <Icon type="search"/>,
        },
            {
                title: 'Relationship',
                dataIndex: 'roleText',
                key: 'role',
                // render: (info) => {
                //     return info;
                // },
            },
            {
                title: 'Joined',
                dataIndex: 'joinedDate',
                key: 'joinedDate',
                render: (date) => {
                    return moment(date).format('L')
                },
                //sorter: (a, b) => a.joinedDate - b.joinedDate,
            },
            {
                title: 'Can report',
                dataIndex: 'canReport',
                key: 'canReport',
                render: (canReport) => {
                    return canReport && <Icon type="check"/>;
                },
            },
            {
                title: 'Phone',
                //dataIndex: 'user',
                key: 'phone',
                render: (info) => {
                    const {user} = info
                    const {phone} = user || {};
                    return <PhoneFieldView  phone={phone} />;
                },
            },
            {
                title: '',
                key: 'act',
                width:50,
                render: (date, info) => {
                    const items = [
                        {key:'edit', content:  <FamilyManagerButton user={user} familyMember={info} asMenuItem />},
                        {key:'delete', content: <FamilyMemberDeleteButton user={user} familyMember={info} onDelete={props.refetch} />}
                    ];
                    return <SettingsDropdown items={items} />
                }
            },
        ];
    }
    const dataSource = members;
    const pageOpts = {
        pageSize: 20,
        total: total,
        hideOnSinglePage: true
    };
    const actions = <React.Fragment>
        {/* <RadioGroup defaultValue="all" style={{marginRight: 10}}>
            <RadioButton value="all">All</RadioButton>
            <RadioButton value="open">Open</RadioButton>
            <RadioButton value="past">Past</RadioButton>
        </RadioGroup> */}
         <RadioGroup defaultValue="active" style={{marginRight: 10}} defaultValue="active" onChange={props.handleStatus}>
            <RadioButton value="active">Active</RadioButton>
            <RadioButton value="pending">Pending</RadioButton>
            <RadioButton value="inactive">Inactive</RadioButton>
        </RadioGroup>

        <Tooltip title="Add New Family"><Button onClick={openModal} size={'small'}><Icon type="plus"/></Button></Tooltip>
    </React.Fragment>;


    return (
        <PageHeaderLayout title={'Family Members ' + (total > 0 ? ' (' + total + ')' : '')}
                          content=""
                          action={actions}
        >

            <Card type="table">
                <TableWithMessage
                emptyMessage={'No Family Members'}
                 size="middle" dataSource={dataSource} rowKey={'id'} columns={columns} pagination={pageOpts}
                       loading={loading} />
            </Card>
            {visibleModal && <FamilyManager user={user} onHide={hideModal} refetch={props.refetch} />}
        </PageHeaderLayout>)
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

export default enhance(UserFamilyTable);