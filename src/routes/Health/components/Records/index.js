import React from 'react';
import {Table} from 'antd';


export default class Records extends React.Component{

    render() {

        const dataSource = [{
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street'
        }, {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street'
        }];

        const columns = [{
            title: 'Type',
            dataIndex: 'name',
            key: 'type',
        }, {
            title: 'Title',
            dataIndex: 'age',
            key: 'title',
        },  {
            title: 'Status',
            dataIndex: 'age',
            key: 'status',
        }, {
            title: 'Added',
            dataIndex: 'address',
            key: 'added',
        }, {
            title: 'Date',
            dataIndex: 'address',
            key: 'date',
        }];
        return (
            <Table dataSource={dataSource} columns={columns} />
        );
    }
}