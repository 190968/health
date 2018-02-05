/**
 * Created by Павел on 31.01.2018.
 */
import React, { PropTypes } from 'react';
import { Form,Card,Icon,Modal,Input,Row,Avatar,Tooltip,List} from 'antd';
import {withRouter} from "react-router-dom";
import Replies from '../Replies';
import moment from 'moment';
import {
    injectIntl,
    defineMessages,
    FormattedMessage
} from 'react-intl';
import messages from './messages';
const FormItem = Form.Item;
const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

class Comment extends React.Component{
    state = { visible: false ,id:null,title:""}
    constructor(props) {
        super(props);
    }

    showModal = (param) => {
        this.setState({
            visible: true,
            id:param
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleModalSubmit = () => {
        const { discussionReply } = this.props;
        this.props.form.validateFields((err, values) => {
            discussionReply(values.textReply,this.props.match.params.id,this.state.id).then(({data}) => {
                this.setState({
                    visible: false
                });
            });

        });
    }

    render(){

        const {loading,discussion} = this.props;
        if (loading) {
            return (
                <Card loading >Loading!!!</Card>
            );
        }
        const {intl}=this.props;
        const {getFieldDecorator} = this.props.form;
        const {replies} = discussion;
        const {edges} = replies;
        return(
            <div>
                <Modal
                    title={intl.formatMessage(messages.reply)}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    okText={intl.formatMessage(messages.send)}
                    onOk={this.handleModalSubmit}
                >
                    <Form onSubmit={this.handleModalSubmit} >
                        <FormItem>
                            {getFieldDecorator('textReply',{
                                initialValue: this.state.title
                                }
                            )(

                                <Input
                                    suffix={<Icon type="paper-clip" />}
                                />

                            )}
                        </FormItem>
                    </Form>

                </Modal>
                <Row>
                    <List
                        loading={loading}
                        itemLayout="vertical"
                        dataSource={edges}
                        renderItem={item => (
                            <List.Item key={item.id}
                                       actions={[ moment(item.createdAt).format('LLL'), <IconText type="like-o" text="0" />, <IconText type="message" text={item.replies.totalCount} onClick={this.showModal.bind(this,item.id)} />, <Tooltip title={'Reply'}><p onClick={this.showModal.bind(this,item.id)} >{intl.formatMessage(messages.reply)}</p></Tooltip>]}

                            >

                                <List.Item.Meta
                                    avatar={<Avatar size="large"></Avatar>}
                                />
                                {item.text}

                               < Replies discussion={discussion} discussionReply={this.props.discussionReply} />
                            </List.Item>

                        )}
                    />
                </Row>
            </div>
        );
    }

}

const WrappedComment = Form.create()(Comment);
export default withRouter(injectIntl(WrappedComment));

