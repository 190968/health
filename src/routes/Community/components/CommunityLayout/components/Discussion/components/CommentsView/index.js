/**
 * Created by Павел on 31.01.2018.
 */
import React, { PropTypes } from 'react';
import { Form,Card,Col,Button,Input,Icon,Avatar } from 'antd';
import {withRouter} from "react-router-dom";
import Comment from '../../components/CommentsList';
import InputBox from '../../../InputBox'
import {
    injectIntl,
    defineMessages,
    FormattedMessage
} from 'react-intl';
import messages from '../../../InputBox/messages';


class CommentsView extends React.Component{

    constructor(props) {
        super(props);
    }






    render(){
        const {loading,discussion} = this.props;
        if (loading) {
            return (
                <Card loading >Loading!!!</Card>
            );
        }

        const {replies} = discussion;

        return(
                <Card
                    title="Replies"
                >
                    <InputBox discussion={discussion} onSubmit={this.props.onSubmit}/>
                    <Comment discussion={{replies}}  discussionReply={this.props.discussionReply} />
                </Card>
        );
    }

}
export default withRouter(injectIntl(CommentsView));
