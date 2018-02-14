/**
 * Created by Павел on 12.02.2018.
 */
import React, { PropTypes } from 'react';
import {List ,Avatar,Tooltip,Button, Icon,Card } from 'antd';
import ModalMakeCommitment from './containers/ModalMakeCommitments'
import moment from 'moment';
class Commitments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible:false
        };
    }
    showModal = () => {
        this.setState({visible: true});
    }
    handleCancel = () => {
        this.setState({ visible: false});

    }
    render() {
        const  {info,loading} = this.props;
        if (loading) {
            return  <Card loading >
                Loading</Card>;
        }
        const{edges} = info.commitments;


        return  (
            <Card
                style={{height:250}}
                title="My Commitments"
                extra={<Tooltip title='Add Commitments'><Button size={"small"} onClick={this.showModal} ><Icon type="plus"/></Button></Tooltip>}
            >
                { this.state.visible && <ModalMakeCommitment handleCancel={this.handleCancel} />}

                <List
                    itemLayout="horizontal"
                    dataSource={edges}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                description={<div><div dangerouslySetInnerHTML={{__html: item.description}}/> <br/> {moment(item.date).format("YYYY-MM-DD")}</div>}
                            />
                        </List.Item>
                    )}
                />
            </Card>

        );
    }
}
export default Commitments;