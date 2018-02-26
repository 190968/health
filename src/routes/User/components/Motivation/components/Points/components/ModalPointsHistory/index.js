/**
 * Created by Павел on 12.02.2018.
 */
import React, { PropTypes } from 'react';
import {Button ,Spin, Table, Icon, Divider,Card,Modal } from 'antd';
import moment from 'moment';
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
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
        const {intl}=this.props;
        const {edges} = pointsHistory;

        edges.forEach(item=>{
            data.push(
                {points:item.amountReceived,receivedFor:item.info.title,receivedOn:item.dateReceived}
              )
        })

        const columns = [{
            title: intl.formatMessage(messages.points),
            dataIndex: 'points',
            key: 'points'
        }, {
            title: intl.formatMessage(messages.receivedFor),
            dataIndex: 'receivedFor',
            key: 'receivedFor',
        }, {
            title: intl.formatMessage(messages.receivedOn),
            dataIndex: 'receivedOn',
            key: 'receivedOn',
            render: (date) => moment(date).format('LLL')
        }];


        return  (

            <Modal
                title={intl.formatMessage(messages.earnedPoints)}
                visible={true}
                onCancel={this.props.handleCancel}
                footer={[
                    <Button key="back" onClick={this.props.handleCancel}>{intl.formatMessage(messages.cancel)}</Button>
                ]}
            >

           <p>{intl.formatMessage(messages.text)}</p><hr/>
                <Table columns={columns} dataSource={data} />
            </Modal>
        );
    }
}
export default injectIntl(ModalPointsHistory);