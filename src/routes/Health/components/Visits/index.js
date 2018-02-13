import React from 'react';
import {Table, Button, Icon, Card} from 'antd';


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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        }];
        return (
            <div>
                {/*<div style={{textAlign:'right'}}>
                <Button size="small"><Icon type="plus" /></Button>
            </div>*/}
                <div className="ant-list-empty-text">No visits has been added</div>

            </div>
        );
    }
}