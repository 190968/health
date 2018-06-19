import React from 'react';
import {Card,Radio,Tooltip,Button, Table, Icon} from 'antd';
import Truncate from 'react-truncate';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import moment from 'moment';
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";
import {PageHeaderLayout} from "../../../../../../components/Layout/PageHeaderLayout/index";
import sort from '../../../../../../components/Tables/sort';
import FamilyManager from './containers/FamilyManager';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
export const UserFamilyTable = props => {

    const {members:providers=[], openModal, visibleModal,hideModal,loading=false} = props;
    const total = providers.length;
    const columns = [{
        title: 'Name',
        dataIndex: 'user',
        key: 'name',
        render: (user) => {
            return <AvatarWithName user={user} />
        },
        sorter: (a, b) => sort(a,b,"name"),
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
            sorter: (a, b) => a.joinedDate - b.joinedDate,
        },
        {
            title: 'Can report',
            dataIndex: 'canReport',
            key: 'canReport',
            render: (canReport) => {
                return canReport && <Icon type="check" />;
            },
        },
        {
            title: 'Phone',
            dataIndex: 'user',
            key: 'phoneFormatted',
            render: (user) => {
                return user.phoneFormatted;
            },
        },

    ];
    const dataSource = providers;
    const pageOpts = {
        pageSize:20,
        total: total,
        hideOnSinglePage: true
    };
    const actions = <React.Fragment>
    <RadioGroup defaultValue="all" style={{marginRight:10}} >
        <RadioButton value="all">All</RadioButton>
        <RadioButton value="open">Open</RadioButton>
        <RadioButton value="past">Past</RadioButton>
    </RadioGroup>
                <Tooltip title="Add New Family"><Button onClick={openModal} ><Icon type="plus" /></Button></Tooltip>
</React.Fragment>;


    return (
        <PageHeaderLayout title={'Family Members '+ (total > 0 ? ' ('+total+')' : '')}
        content="You can view and manage tumor boards here"
        action={actions}
        >

    <Card type="basic1  ant-card-type-table">
        <Table size="middle" dataSource={dataSource} rowKey={'id'} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>
    {visibleModal && <FamilyManager onHide={hideModal} />}
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