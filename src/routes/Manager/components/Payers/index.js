import React from 'react';
import {Table,Tooltip,Button, Radio, Card, Input, Icon} from 'antd';

import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
import sort from '../../../../components/Tables/sort';
import PayersManager from './containers/PayersManager.js'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Payers = props => {
    const {getPayers = [], visibleModal,openModal,hideModal,totalCount,searchText,emitEmpty,onSearch,searchTextCode,emitEmptyCode,onSearchCode, loading = false} = props;
    const suffix = searchText ? <Icon type="close-circle-o" onClick={emitEmpty}/> : <Icon type="search"/> 
    const suffixCode = searchTextCode ? <Icon type="close-circle-o" onClick={emitEmptyCode}/> : <Icon type="search"/> 
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',    
            key: 'name',
            render: (name) => {
                return name;
            },
            sorter: (a, b) => sort(a,b,"name"),
            filterDropdown: (
                <Input
                     suffix={suffix}
                    ref={ele => this.searchInput = ele}
                    placeholder="Search name"
                    value={searchText}
                    onChange={onSearch}
                    onPressEnter={onSearch}
                />
        ),
        filterIcon: <Icon type="search"/>,
        },
        {
            title: 'HP Сode',
            dataIndex: 'code',    
            key: 'code',
            sorter: (a, b) => a.code - b.code,
            filterDropdown: (
                <Input
                     suffix={suffixCode}
                    ref={ele => this.searchInput = ele}
                    placeholder="Search code"
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
        <Tooltip title="Invite"><Button onClick={openModal} type="primary"><Icon type="plus"/></Button></Tooltip>
    </React.Fragment>;

    return (
        <PageHeaderLayout title={'Payers ' + (totalCount > 0 ? ' (' + totalCount + ')' : '')}
                          action={actions}
        >

            <Card type="basic1  ant-card-type-table">
                <Table  size="middle" dataSource={getPayers} rowKey={'id'} columns={columns}
                       pagination={pageOpts} loading={loading}/>
            </Card>
            {visibleModal && <PayersManager onHide={hideModal}/>}
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

export default enhance(Payers);