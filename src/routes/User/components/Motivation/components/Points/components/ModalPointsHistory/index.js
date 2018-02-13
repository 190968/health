/**
 * Created by Павел on 12.02.2018.
 */
import React, { PropTypes } from 'react';
import {Button ,Spin, Table, Icon, Divider,Card,Modal } from 'antd';
import moment from 'moment';
class ModalPointsHistory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible:true
        };
    }

    render() {
        const data = [];
        const  {pointsHistory,loading} = this.props;
        if (loading) {
            return    <Modal>
                <Spin/>
                </Modal> ;
        }
        const {edges} = pointsHistory;

        edges.forEach(item=>{
            data.push(
                {points:item.amountReceived,receivedFor:item.info.title,receivedOn:item.dateReceived}
              )
        })

        const columns = [{
            title: 'Points',
            dataIndex: 'points',
            key: 'points'
        }, {
            title: 'Received For',
            dataIndex: 'receivedFor',
            key: 'receivedFor',
        }, {
            title: 'Received On',
            dataIndex: 'receivedOn',
            key: 'receivedOn',
            render: (date) => moment(date).format('LLL')
        }];

        console.log(pointsHistory);
        return  (

            <Modal
                title="Earned Points"
                visible={true}
<<<<<<< HEAD:src/routes/User/components/Motivation/components/Points/components/ModalPointsHistory/index.js
                onCancel={this.props.handleCancel}
=======
                onCa ncel={this.handleCancel}
>>>>>>> 2c80e5e558e46d4dfb4f8d40c1c11d045830c619:src/routes/User/components/Motivation/components/Points/components/ModalPointsHistory/components/index.js
                footer={[
                    <Button key="back" onClick={this.props.handleCancel}>Cancel</Button>
                ]}
            >

           <p>You are currently on the Newbie level. You need 260 more points to reach the Pioneer level. Stay active on the system to advance!</p><hr/>
                <Table columns={columns} dataSource={data} />
            </Modal>
        );
    }
}
export default ModalPointsHistory;