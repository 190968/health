/**
 * Created by Павел on 31.01.2018.
 */
import React, { PropTypes } from 'react';
import { Form,Card,Icon,Modal,Input,Row,Avatar,Tooltip,List} from 'antd';
import {withRouter} from "react-router-dom";
import Replies from '../../../Replies';
import CommentModal from '../CommentModal/containers/CommentModal.js'
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
    state = { visibleReplyModal: false ,id:null,title:""}


    showModal = (param) => {
        this.setState({
            visibleReplyModal: true,
            id:param
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
        const {replies} = discussion;
        const {edges} = replies;
        //console.log(edges);
        return(
            <div>
                {this.state.visibleReplyModal && <CommentModal params={this.state.id}  parentMessageId={this.props.match.params.id} />}
                <Row>
                    {edges.length > 0 ? <List
                        loading={loading}
                        itemLayout="vertical"
                        dataSource={edges}
                        renderItem={item => (
                            <List.Item key={item.id}
                                       actions={[ moment(item.createdAt).format('LLL'),
                                           <IconText type="like-o" text="0" />,
                                           <IconText type="message" text={item.replies.totalCount} onClick={this.showModal.bind(this,item.id)} />,
                                           <Tooltip title={'Reply'}><p onClick={this.showModal.bind(this,item.id)} >{intl.formatMessage(messages.reply)}</p></Tooltip>]}

                            >

                                <List.Item.Meta
                                    avatar={<Avatar size="large"></Avatar>}
                                />
                                {item.text}

                                {item.replies.totalCount>0 ?<Replies discussion={item.replies} discussionReply={this.props.discussionReply} />:null}
                            </List.Item>

                        )}
                    /> : <div style={{textAlign:'center'}}>No Replies</div>}
                </Row>
            </div>
        );
    }

}
export default withRouter(injectIntl(Comment));

