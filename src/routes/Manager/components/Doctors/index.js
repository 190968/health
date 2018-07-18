import React from 'react';
import {Table,Menu,Dropdown, Tooltip, Button,Radio, Card, Input, Icon} from 'antd';

import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
import sort from '../../../../components/Tables/sort';
import DoctorManager from './containers/DoctorManager';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Doctors = props => {
    const {getDoctors = [], total,visibleModal,hideModal,searchText,openModal,emitEmpty,onSearch,searchTextCode,emitEmptyCode,onSearchCode,searchTextPhone,emitEmptyPhone,onSearchPhone, loading = false} = props;
    const suffix = searchText ? <Icon type="close-circle-o" onClick={emitEmpty}/> : <Icon type="search"/> 
    const suffixCode = searchTextCode ? <Icon type="close-circle-o" onClick={emitEmptyCode}/> : <Icon type="search"/> 
    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'firstName',    
            key: 'firstName',
            render: (firstName,data) => {
                return <span>{data.firstName} {" "}{data.lastName}</span>;
            },
            sorter: (a, b) => sort(a,b,"firstName"),
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
            title: 'NPI',
            dataIndex: 'npi',    
            key: 'npi',
            sorter: (a, b) => a.npi - b.npi,
            filterDropdown: (
                <Input
                     suffix={suffixCode}
                    ref={ele => this.searchInput = ele}
                    placeholder="Search npi"
                    value={searchTextCode}
                    onChange={onSearchCode}
                    onPressEnter={onSearchCode}
                />
        ),
        filterIcon: <Icon type="search"/>,
        },
        {
            title: 'Phone number',
            dataIndex: 'phoneFormatted',    
            key: 'phoneFormatted',
            sorter: (a, b) => a.phoneFormatted - b.phoneFormatted,
            filterDropdown: (
                <Input
                     suffix={suffixCode}
                    ref={ele => this.searchInput = ele}
                    placeholder="Search npi"
                    value={searchTextPhone}
                    onChange={onSearchPhone}
                    onPressEnter={onSearchPhone}
                />
        ),
        filterIcon: <Icon type="search"/>,
        },
        {
            render: (info) => {
                const menu = (
                    <Menu>
                        <Menu.Item>
                            <Icon type="edit"/> Edit
                        </Menu.Item>
                        <Menu.Item>
                            <Icon type="delete"/> Delete
                        </Menu.Item>
                    </Menu>
                );
                return <Dropdown overlay={menu} trigger={['click']}>
                    <Icon type="setting"/>
                </Dropdown>;
            },
            width:50
        }
    ];
    const pageOpts = {
        pageSize: 20,
        total: total,
        hideOnSinglePage: true
    };
 
    const actions = <React.Fragment>
        <Tooltip title="Invite"><Button onClick={openModal} type="primary"><Icon type="plus"/></Button></Tooltip>
    </React.Fragment>;

    return (
        <PageHeaderLayout title={'Doctors ' + (total > 0 ? ' (' + total + ')' : '')}
                          action={actions}
        >

            <Card type="basic1  ant-card-type-table">
                <Table  size="middle" dataSource={getDoctors} rowKey={'id'} columns={columns}
                       pagination={pageOpts} loading={loading}/>
            </Card>
            {visibleModal && <DoctorManager onHide={hideModal}/>}
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

export default enhance(Doctors);