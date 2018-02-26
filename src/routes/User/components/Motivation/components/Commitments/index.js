/**
 * Created by Павел on 12.02.2018.
 */
import React, { PropTypes } from 'react';
import {List ,Avatar,Tooltip,Button, Icon,Card } from 'antd';
import ModalMakeCommitment from './containers/ModalMakeCommitments'
import ModalView  from  './components/ModalView';
import moment from 'moment';
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
class Commitments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            viewVisible:false
        };
    }
    showModal = () => {
        this.setState({visible: true});
    }
    showModalView = () => {
        this.setState({viewVisible: true});
    }
    handleCancel = () => {
        this.setState({ visible: false,viewVisible: false});

    }
    render() {
        const  {info,loading} = this.props;
        if (loading) {
            return  <Card style={{height:250}} loading title="My Commitments" >
               </Card>;
        }
        const{edges} = info.commitments;
        const{motivators} = this.props;
        const {intl}=this.props;

        return  (
            <Card
                style={{height:250}}
                title={intl.formatMessage(messages.myCommitments)}
                extra={<Tooltip title={intl.formatMessage(messages.addCommitments)}><Button size={"small"} onClick={this.showModal} ><Icon type="plus"/></Button></Tooltip>}
                className="demo-infinite-container"
            >
                { this.state.visible && <ModalMakeCommitment motivators={motivators} handleCancel={this.handleCancel} />}
                { this.state.viewVisible && <ModalView handleCancel={this.handleCancel} />}

                <List
                    itemLayout="horizontal"
                    dataSource={edges}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar onClick={this.showModalView} size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                description={<div><div dangerouslySetInnerHTML={{__html: item.description}}/> <br/> {moment(item.date).format("YYYY-MM-DD")}</div>}
                            />
                        </List.Item>
                    )}
                />
            </Card>

        );
    }
}
export default injectIntl(Commitments);