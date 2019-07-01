/**
 * Created by Павел on 31.01.2018.
 */
import React from 'react';
import {Card,Icon,Row,Tooltip,List, Comment} from 'antd';
import Avatar from '../../../../../../../User/components/Avatar';
import {withRouter} from "react-router-dom";
import Replies from '../../../Replies';
import CommentModal from '../CommentModal/containers/CommentModal.js'
import moment from 'moment';
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
import { ListWithMessage } from '../../../../../../../../components/UI/List';
import AvatarWithName from '../../../../../../../User/components/AvatarWithName';
import { compose } from 'recompose';
import { withToggleModal } from '../../../../../../../../components/Modal';
const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);


const DiscussionCommentItemPure = (comment) => {
    console.log(comment);
    /*
    createdAt: "2015-10-20T20:16:00+00:00"
date: null
id: "a757"
isImportant: null
replies: {totalCount: 0, edges: Array(0), __typename: "CommentsConnection"}
text: "sdff"
unread: true
*/
    const {id, text, author, createdAt, replies, toggleModal, showModal} = comment;
    const {edges=[]} = replies || {};
    
    return <>
    {showModal && <CommentModal params={id} onHide={toggleModal} /*parentMessageId={props.match.params.id}*/ />}
    <Comment
      actions={[<span onClick={toggleModal}>Reply to</span>]}
      datetime={moment(createdAt).format('lll')}
      author={<AvatarWithName user={author} onlyName />}
      avatar={(
        <Avatar
         user={author}
        />
      )}
      content={text}
    >
      {edges && edges.length > 0 && <List
            dataSource={edges}
            header={`${edges.length} ${edges.length > 1 ? 'replies' : 'reply'}`}
            itemLayout="horizontal"
            renderItem={props => <DiscussionCommentItem {...props} />}
        />}
    </Comment></>
};
const DiscussionCommentItem = withToggleModal(DiscussionCommentItemPure);
const DiscussionComment = props => {
    const {discussion} = props;
    const {replies} = discussion || {};
    const {edges=[]} = replies || {};

    return <ListWithMessage
    emptyMessage={'No Comments'}
    dataSource={edges}
    header={`${edges.length} ${edges.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <DiscussionCommentItem {...props} />}
  />

}

class DiscussionComment2 extends React.Component{
    state = { visibleReplyModal: false ,id:null,title:""}


    showModal = (param) => {
        console.log(param);
        this.setState({
            visibleReplyModal: true,
            id:param
        });
    }
    unshowModal = () => {
        this.setState({
            visibleReplyModal: false
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

        return(
            <div>
                {this.state.visibleReplyModal && <CommentModal params={this.state.id} unshowModal={this.unshowModal}  parentMessageId={this.props.match.params.id} />}
                <Row>
                    {edges.length > 0 ? <List
                        loading={loading}
                        itemLayout="vertical"
                        dataSource={edges}
                        renderItem={item => (
                            <List.Item key={item.id}
                                       actions={[ moment(item.createdAt).format('lll'),
                                           <IconText type="like-o" text="0" />,
                                           <IconText type="message" text={item.replies.totalCount} onClick={this.showModal.bind(this,item.id)} />,
                                           <Tooltip title={'Reply'}><p onClick={this.showModal.bind(this,item.id)} >{intl.formatMessage(messages.reply)}</p></Tooltip>]}

                            >

                                <List.Item.Meta
                                    avatar={<Avatar info={this.props.user}/>}
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
export default withRouter(injectIntl(DiscussionComment));

