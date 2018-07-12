import React from 'react';
import {Table, Radio, Card, Input, Icon} from 'antd';

import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
import sort from '../../../../components/Tables/sort';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Doctors = props => {
    const {getDoctors = [], totalCount,searchText,emitEmpty,onSearch,searchTextCode,emitEmptyCode,onSearchCode, loading = false} = props;
    const suffix = searchText ? <Icon type="close-circle-o" onClick={emitEmpty}/> : <Icon type="search"/> 
    const suffixCode = searchTextCode ? <Icon type="close-circle-o" onClick={emitEmptyCode}/> : <Icon type="search"/> 
    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'firstName',    
            key: 'firstName',
            render: (fullName) => {
                return fullName;
            },
            sorter: (a, b) => sort(a,b,"firstName"),
            filterDropdown: (
                <Input
                     suffix={suffix}
                    ref={ele => this.searchInput = ele}
                    placeholder="Search full name"
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
    ];
    const pageOpts = {
        pageSize: 20,
        total: totalCount,
        hideOnSinglePage: true
    };
 
    const actions = <React.Fragment>
        <RadioGroup defaultValue="active" style={{marginRight: 10}}>
            <RadioButton value="active">Active</RadioButton>
            <RadioButton value="pending">Pending</RadioButton>
        </RadioGroup>
        {/* <Tooltip title="Invite"><Button onClick={openModal} type="primary"><Icon type="plus"/></Button></Tooltip> */}
    </React.Fragment>;

    return (
        <PageHeaderLayout title={'Doctors ' + (totalCount > 0 ? ' (' + totalCount + ')' : '')}
                          action={actions}
        >

            <Card type="basic1  ant-card-type-table">
                <Table  size="middle" dataSource={getDoctors} rowKey={'id'} columns={columns}
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

export default enhance(Doctors);