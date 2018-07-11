import React from 'react';
import {Row, Col, Layout, Table, Input,Radio, Card, Menu, Icon, Divider, Alert, Button, Dropdown, Tooltip} from 'antd';
import {NavLink} from 'react-router-dom';
import moment from 'moment';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
import {AvatarWithName} from "../../../User/components/AvatarWithName/index";
import ProviderEditor from "./containers/ProvidersManager";

import sort from '../../../../components/Tables/sort';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


const ProidersManager = props => {
    const {getProviders = [], loadByStatus,edges=[],searchText,emitEmpty,onSearch, openModal, totalCount, selectedCount, showButton, openShowButton, hideShowButton, visibleModal, visibleInviteModal, openInviteModal, hideInviteModal, hideModal, loading = false} = props;
    const suffix = searchText ? <Icon type="close-circle-o" onClick={emitEmpty}/> : <Icon type="search"/>

    const columns = [{
        title: 'Title',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => sort(a, b,"name"),
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
            title: 'Type',
            dataIndex: 'type',    
            key: 'type',
            sorter: (a, b) => (a.type - b.type)
        },
        {
            title: 'Patients',
            dataIndex: 'patients',
            key: 'patients',
            sorter: (a, b) => (a.patients - b.patients)
        },
        {
            title: 'Managers',
            dataIndex: 'managers',
            key: 'managers',
            sorter: (a, b) => (a.managers - b.managers  )
        },
        {
            title: 'Care Givers',
            dataIndex: 'managers',
            key: 'managers',
            sorter: (a, b) => (a.managers - b.managers  )
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
            sorter: (a, b) => (a.managers - b.managers  )
        },
        

    ];
    const pageOpts = {
        pageSize: 20,
        total: totalCount,
        hideOnSinglePage: true
    };
    const actions = <React.Fragment>
        <RadioGroup defaultValue="active" style={{marginRight: 10}}>
            <RadioButton value="active" onClick={loadByStatus}>Active</RadioButton>
            <RadioButton value="archived" onClick={loadByStatus}>Archived</RadioButton>
        </RadioGroup>
        <Tooltip title="Invite"><Button onClick={openModal} type="primary"><Icon type="plus"/></Button></Tooltip>
    </React.Fragment>;

    return (
        <PageHeaderLayout title={'Providers ' + (totalCount > 0 ? ' (' + totalCount + ')' : '')}
                          action={actions}
        >
            <Card type="basic1  ant-card-type-table">
                <Table size="middle" dataSource={edges} rowKey={'id'} columns={columns}
                       pagination={pageOpts} loading={loading}/>
            </Card>
            {visibleModal && <ProviderEditor onHide={hideModal}/>}
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