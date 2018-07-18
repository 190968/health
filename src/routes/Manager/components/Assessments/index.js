import React from 'react';
import {Table,Menu,Tooltip,Button, Dropdown, Radio, Card, Input, Icon} from 'antd';
import moment from 'moment';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
import sort from '../../../../components/Tables/sort';
import AssessmentsEditor from "./containers/AssessmentsEditor";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Assessments = props => {
    const {getAssessments = [],openModal,visibleModal,hideModal, totalCount,searchText,emitEmpty,onSearch,searchTextCode,emitEmptyCode,onSearchCode, loading = false} = props;
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
            title: 'Status',
            dataIndex: 'status',    
            key: 'status',
            sorter: (a, b) => a.status - b.status,
        },
        
        {
            title: 'Created Date',
            dataIndex: 'createdDate',    
            key: 'createdDate',
            render: (info) => moment(info).format('L'),
            sorter: (a, b) => a.createdDate - b.createdDate,
        },
        {
            title: 'Total Assigns',
            dataIndex: 'getTotalAssigns',    
            key: 'getTotalAssigns',
            sorter: (a, b) => a.getTotalAssigns - b.getTotalAssigns,
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
        <PageHeaderLayout title={'Assessments ' + (totalCount > 0 ? ' (' + totalCount + ')' : '')}
                          action={actions}
        >

            <Card type="basic1  ant-card-type-table">
                <Table  size="middle" dataSource={getAssessments} rowKey={'id'} columns={columns}
                       pagination={pageOpts} loading={loading}/>
            </Card>
            {visibleModal && <AssessmentsEditor onHide={hideModal}/>}
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

export default enhance(Assessments);