/**
 * Created by Павел on 12.02.2018.
 */
import React, { PropTypes } from 'react';
import {Button ,Spin, Table, Icon, Divider,Card,Modal } from 'antd';
class Points extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible:true
        };
    }
    handleCancel = () => {
        this.setState({ visible: false});
    }
    render() {
        // const data = [];
        const  {info,loading} = this.props;
        if (loading) {
            return    <Modal>
                <Spin/>
                </Modal> ;
        }
        const {edges} = info;
        // edges.forEach(item=>{
        //     data.push({})
        // })
        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        }];
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: 'Action',
            key: 'action',
        }];



        console.log(info);
        return  (

            <Modal
                title="Earned Points"
                visible={true}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>Cancel</Button>
                ]}
            >

           <p>You are currently on the Newbie level. You need 260 more points to reach the Pioneer level. Stay active on the system to advance!</p><hr/>
                <Table columns={columns} dataSource={data} />
            </Modal>
        );
    }
}
export default Points;