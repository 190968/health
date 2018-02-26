import React from 'react';
import moment from 'moment';
import {Table,  Button, Icon, Tooltip} from 'antd';





export default class Workflow extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: {},
    };

    handleChange = (pagination, filters, sorter) => {
        //console.log('Various parameters', pagination, filters, sorter);
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, info) => {
                return info.isActive ? 'Active' : 'Inactive'
            },
            filters: [
                {text: 'Active', value: true},
                {text: 'InActive', value: false},
            ],
            /*filteredValue: filteredInfo.isActive || null,*/
            onFilter: (value, record) => record.isActive.includes(value),
            sorter: (a, b) => a.isActive - b.isActive,
            sortOrder: sortedInfo.columnKey === 'isActive' && sortedInfo.order,
        }, {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'date',
            render: (info) => moment(info).format('L'),
        }];

        const dataSource = [];
        return (
            <React.Fragment>
                <div style={{textAlign:'right', marginBottom:10}}>
                    <Tooltip title="Add New Workflow"><Button><Icon type="plus"  /></Button></Tooltip>
                </div>
                <Table dataSource={dataSource} columns={columns} pagination={false} onChange={this.handleChange}
                       ref={(input) => {
                           this.table = input;
                       }}/>
            </React.Fragment>);
    }
}