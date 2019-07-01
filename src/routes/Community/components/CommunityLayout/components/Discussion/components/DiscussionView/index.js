/**
 * Created by Павел on 31.01.2018.
 */
import React from 'react';
import {Card,Row,Col,Popconfirm,Tooltip,Icon, Comment } from 'antd';
import AvatarWithName from '../../../../../../../User/components/AvatarWithName';
import moment from 'moment';
import {withRouter} from "react-router-dom";
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
import { AttachmentsList } from '../../../../../../../../components/FormCustomFields/components/Attachments';


class DiscussionView extends React.Component{



    handleClick = () => {
        const { discussion, discussionDelete, history } = this.props;
        discussionDelete(discussion.id).then(({data}) => {
            history.push("/community/"+discussion.category.id);
        });
    }


    render(){

        const {loading,discussion,user} = this.props;

        if (loading) {
            return (
                <Card loading >Loading!!!</Card>
            );
        }

        const {title,text,author,createdAt, attachments} = discussion;
        const {id} = author;
        const {intl}=this.props;
        return <Card  title={title} extra={
                      <div>
                          {id===user.id ?
                        <Popconfirm title={intl.formatMessage(messages.popconfirm)}
                                    onConfirm={this.handleClick}
                                    okText={intl.formatMessage(messages.yes)}
                                    cancelText={intl.formatMessage(messages.no)}>
                        <Tooltip title={intl.formatMessage(messages.delete)}><Icon type="close" /></Tooltip>
                        </Popconfirm> :null}
                          </div>}>
                    


                          <Comment
                            // actions={actions}
                            author={<AvatarWithName user={user} onlyName/>}
                            avatar={
                                <AvatarWithName user={user} onlyAvatar/>
                            }
                            content={text}
                            datetime={
                            <Tooltip title={moment(createdAt).format('lll')}>
                                <span>{moment(createdAt).format('lll')}</span>
                            </Tooltip>
                            }
                        />

                        {(attachments && attachments.length > 0) && <div type="pure" bordered={false} style={{marginTop:10}}><AttachmentsList attachments={attachments} isEditable={false}  /></div>}
        
                        {/* {text} */}
                </Card>
    }

}
export default withRouter(injectIntl(DiscussionView));
