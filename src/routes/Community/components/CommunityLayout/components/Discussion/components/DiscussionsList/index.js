import { Card, List, Icon, Comment } from 'antd';
import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { Empty } from "../../../../../../../../components/Loading";
import AvatarWithName from '../../../../../../../User/components/AvatarWithName';
import { ListWithMessage } from '../../../../../../../../components/UI/List';
import Avatar from '../../../../../../../User/components/Avatar';



const DiscussionsList = props => {
    const {discussions=[], loading} = props;
    return <Card
                title={'Discussions'}
                // extra={canAdd && <Button type="primary" size="small" onClick={this.showModal}>{intl.formatMessage(messages.start)}</Button>}
            >
                <ListWithMessage
                    emptyMessage={'No Discussions'}
                    loading={loading}
                    itemLayout="vertical"
                    dataSource={discussions}
                    renderItem={item => {
                        return <DiscussionListItem key={item.id} discussion={item} />
                    }}
                />
            </Card>
}

 
export default DiscussionsList;

 
const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

const DiscussionListItem = props => {
    const {discussion} = props;
    const {id, title, lastReply, createdAt, replies=[], views=0, author} = discussion || {};
    const {createdAt:replyCreatedAt, author:replyAuthor} = lastReply || {};
    const {totalCount} = replies || {};

    const actions = [/*<IconText type="clock-circle-o" text={moment(createdAt || replyCreatedAt).format('lll')} />,*/<IconText type="eye-o" text={views} />, <IconText type="like-o" text="0" />, <Link to={'/community/discussion/' + id} style={{color: 'inherit'}}><IconText type="message" text={totalCount} /></Link>];
    return <List.Item><Comment 
    actions={actions}
    author={title}
    avatar={<Avatar user={replyAuthor || author}/>}
    content={<Link to={'/community/discussion/' + id}>{lastReply.text || discussion.text}</Link>}
    datetime={moment(createdAt || replyCreatedAt).format('lll')}
  /></List.Item>;
    // return <List.Item key={id}
    //     actions={[<IconText type="clock-circle-o" text={moment(createdAt || replyCreatedAt).format('lll')} />,<IconText type="eye-o" text={views} />, <IconText type="like-o" text="0" />, <Link to={'/community/discussion/' + id} style={{color: 'inherit'}}><IconText type="message" text={totalCount} /></Link>]}
    //         >

    //             <List.Item.Meta
    //                 avatar={<Avatar user={replyAuthor || author}/>}
    //                 title={<Link to={'/community/discussion/' + id} style={{color: 'inherit'}}>{title}</Link>}
    //                 description={lastReply.text || discussion.text}
    //             />
    //         </List.Item>;
}