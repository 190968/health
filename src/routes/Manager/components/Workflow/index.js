import React from 'react';
import moment from 'moment';
import {Table,  Button, Icon, Tooltip} from 'antd';





export default class Actionplans extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: {},
    };

    handleChange = (pagination, filters, sorter) => {

        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }


    render() {

        let { sortedInfo } = this.state;
        const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.length - b.title.length,
        }, {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => a.createdAt - b.createdAt,
            /*render: (text, info) => {
                return info.isActive ? 'Active' : 'Inactive'
            },
            filters: [
                {text: 'Active', value: true},
                {text: 'InActive', value: false},
            ],
            onFilter: (value, record) => record.isActive.includes(value),
            sorter: (a, b) => a.isActive - b.isActive,
            sortOrder: sortedInfo.columnKey === 'isActive' && sortedInfo.order,*/
        }, {
            title: 'By',
            dataIndex: 'createdBy',
            key: 'createdBy',
            sorter: (a, b) => a.createdBy - b.createdBy,
            //render: (info) => moment(info).format('L'),
        }, {
            title: 'Downloads',
            dataIndex: 'downloads',
            key: 'downloads',
        },{
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        }];

        const dataSource = [];
        return (
            <React.Fragment>
                <div style={{textAlign:'right', marginBottom:10}}>
                    <Tooltip title="Add New ActionPlan"><Button><Icon type="plus" /></Button></Tooltip>
                </div>
                <Table dataSource={dataSource} columns={columns} pagination={false} onChange={this.handleChange}
                       ref={(input) => {
                           this.table = input;
                       }}/>
            </React.Fragment>);
    }
}