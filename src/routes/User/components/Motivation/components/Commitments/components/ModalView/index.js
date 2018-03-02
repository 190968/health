/**
 * Created by Павел on 12.02.2018.
 */
import React from 'react';
import {Button ,Row,Col,Avatar,Spin,List ,Modal } from 'antd';
import moment from 'moment';
import {
    injectIntl
} from 'react-intl';
import { Link } from 'react-router-dom'
import messages from './messages';
class ModalView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible:true
        };
    }
    onChange = () => {
        this.setState({ visible: false});
    }
    render() {
        const  {loading,title,url,commitedBy,commited} = this.props;
        const {intl}=this.props;

        if (loading) {
            return(
            <Modal>
                <Spin/>
            </Modal>) ;
        }

        return  (

            <Modal
                style={{height:800, width: 800 }}
                title={intl.formatMessage(messages.viewCommitment)}
                visible={true}
                onCancel={this.props.handleCancel}
                footer={[
                    <center> <Button type="primary"  onClick={this.props.handleCancel}>{intl.formatMessage(messages.close)}</Button></center>
                ]}
            >
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar style={{width:75,height:75}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        description={
                            <div>
                            <Row>
                                <Col span={7}><h4>{intl.formatMessage(messages.plan)}</h4></Col>
                                <Col offset={1} span={16}><Link to={url}>{title}</Link></Col>
                            </Row>
                            <Row>
                                <Col span={7}><h4>{intl.formatMessage(messages.commitedBy)}</h4></Col>
                                <Col offset={1} span={16}>{moment(commitedBy).format("LLL")}</Col>
                            </Row>
                            <Row>
                                <Col span={7}><h4>{intl.formatMessage(messages.commited)}</h4></Col>
                                <Col offset={1} span={16}>{commited}</Col>
                            </Row>
                                </div>
                        }
                    />
                </List.Item>
            </Modal>
        );
    }
}
export default injectIntl(ModalView);