import React from 'react';
import { Row, Col,Layout,Table,Radio, Card,Menu, Icon, Divider, Alert, Button, Dropdown,Tooltip } from 'antd';
import {NavLink} from 'react-router-dom';
import moment from 'moment';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
import {AvatarWithName} from "../../../User/components/AvatarWithName/index";
import SupervisorsManager from "./containers/SupervisorsManager";
import sort from '../../../../components/Tables/sort';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;



const Supervisors = props => {
    const {management=[], openModal,totalCount, visibleModal,hideModal,loading=false} = props;
    const {edges} = management;
    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        // render: (user) => {
        //     return <AvatarWithName user={props.management} />
        // },
        // sorter: (a, b) => sort(a,b,"name"),
    },
    {
        title: 'Joined',
        dataIndex: 'joinedDate',
        key: 'joinedDate',
        // render: (joinedDate) => {
        //     return moment(joinedDate).format('L')
        // },
        // sorter: (a, b) => a.joinedDate - b.joinedDate,
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        // render: (phone) => {
        //     return phone.number;
        // },
    },
        {
            title: 'Last Login',
            dataIndex: 'lastLoginDate',
            key: 'lastLoginDate',
            // render: (lastLoginDate) => {
            //     return lastLoginDate;
            // },
        },
        {
            title: 'Access Level',
            dataIndex: 'accessLevel',
            key: 'accessLevel',
            // render: (accessLevel) => {
            //     return accessLevel ;
            // },
        },

    ];
     const pageOpts = {
        pageSize:20,
        total: totalCount,
        hideOnSinglePage: true
    };
        const actions = <React.Fragment>
        <RadioGroup defaultValue="all" style={{marginRight:10}} >
            <RadioButton value="all">All</RadioButton>
            <RadioButton value="open">Open</RadioButton>
            <RadioButton value="past">Past</RadioButton>
        </RadioGroup>
        <Tooltip title="Invite"><Button onClick={openModal} size="small"><Icon type="plus"  /></Button></Tooltip>
    </React.Fragment>;

        return (
                <PageHeaderLayout title={'Supervisors Manager'+ (totalCount > 0 ? ' ('+totalCount+')' : '')}
                content="You can view and manage tumor boards here"
                action={actions}
                >

    <Card type="basic1  ant-card-type-table">
        <Table size="middle" dataSource={edges} rowKey={'id'} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>
    {visibleModal && <SupervisorsManager onHide={hideModal} />}
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

export default enhance(Supervisors);