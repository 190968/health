/**
 * Created by Павел on 12.02.2018.
 */
import React from 'react';
import {Button ,Row,Col,Avatar,Spin,Select, List , Input, Divider,Card,Modal } from 'antd';
import moment from 'moment';
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
const {Option} = Select;
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
        const  {info,loading} = this.props;
        const {intl}=this.props;

        if (loading) {
            return
            <Modal>
                <Spin/>
            </Modal> ;
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
                                <Col offset={1} span={7}>{moment("2019-10-10").format("YYYY-MM-DD")}</Col>
                            </Row>
                            <Row>
                                <Col span={7}><h4>{intl.formatMessage(messages.commitedOn)}</h4></Col>
                                <Col offset={1} span={7}>{moment("2019-10-10").format("YYYY-MM-DD")}</Col>
                            </Row>
                            <Row>
                                <Col span={7}><h4>{intl.formatMessage(messages.commited)}</h4></Col>
                                <Col offset={1} span={7}>{moment("2019-10-10").format("YYYY-MM-DD")}</Col>
                            </Row>
                            <Row>
                                <Col span={7}><h4>{intl.formatMessage(messages.after)}</h4></Col>
                                <Col offset={1} span={7}>{moment("2019-10-10").format("YYYY-MM-DD")}</Col>
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