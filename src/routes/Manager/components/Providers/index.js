import React from 'react';
import {Row, Col, Layout, Table, Radio, Card, Menu, Icon, Divider, Alert, Button, Dropdown, Tooltip} from 'antd';
import {NavLink} from 'react-router-dom';
import moment from 'moment';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
import {AvatarWithName} from "../../../User/components/AvatarWithName/index";
import ProvidersManagerr from "./containers/ProvidersManager";
//import InviteButton from "../../../../components/Tables/InviteButton/index";
import sort from '../../../../components/Tables/sort';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


const ProidersManager = props => {
    const {getProviders = {}, openModal, selectedCount, showButton, openShowButton, hideShowButton, visibleModal, visibleInviteModal, openInviteModal, hideInviteModal, hideModal, loading = false} = props;
    const {edges, totalCount} = getProviders;
    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
       
        sorter: (a, b) => sort(a.name, b.name),
    },
        
        {
            title: 'Type',
            dataIndex: 'typeText',
            key: 'type',
        },
        {
            title: 'Patients',
            dataIndex: 'getTotalPatients',
            key: 'getTotalPatients',
            render: (total) => {
                return total;
            },
        },
        {
            title: 'Managers',
            dataIndex: 'getTotalManagers',
            key: 'getTotalManagers',
            render: (total) => {
                return total;
            },
        },
        {
            title: 'Care Givers',
            dataIndex: 'getTotalCareGivers',
            key: 'getTotalManagers',
            render: (total) => {
                return total;
            },
        },
        {
            title: 'Score',
            dataIndex: 'getAdherence',
            key: 'getAdherence',
            render: (adhrence) => {
                return adhrence.level;
            },
        },
    ];
    const pageOpts = {
        pageSize: 20,
        total: totalCount,
        hideOnSinglePage: true
    };
    const rowSelection = {
        onChange: record => (
            record.length < 1 ? hideShowButton() : openShowButton(record.length)

        ),
        getCheckboxProps: record => ({
            name: record.name,
        }),
    };
    const actions = <React.Fragment>
        <RadioGroup defaultValue="active" style={{marginRight: 10}}>
            <RadioButton value="active">Active</RadioButton>
            <RadioButton value="archived">Archived</RadioButton>
        </RadioGroup>
        <Tooltip title="Invite"><Button onClick={openModal} type="primary"><Icon type="plus"/></Button></Tooltip>
    </React.Fragment>;

    return (
        <PageHeaderLayout title={'Providers ' + (totalCount > 0 ? ' (' + totalCount + ')' : '')}
                          action={actions}
        >

            <Card type="basic1  ant-card-type-table">
                <Table rowSelection={rowSelection} size="middle" dataSource={edges} rowKey={'id'} columns={columns}
                       pagination={pageOpts} loading={loading}/>
                {/* {showButton && <InviteButton selectedCount={selectedCount}/>} */}
            </Card>
            {/* {visibleModal && <NetworkManagerr onHide={hideModal}/>} */}
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

export default enhance(ProidersManager);