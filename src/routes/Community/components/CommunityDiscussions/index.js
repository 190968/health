/**
 * Created by Павел on 31.01.2018.
 */
import React, { PropTypes } from 'react';
import { Form,Card } from 'antd';
import {withRouter} from "react-router-dom";
import DiscussionView from './components/DiscussionView';
import CommentsView from './components/CommentsView';



class Discussions extends React.Component{

    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            return onSubmit(values);
        });
    }

    render(){
        const {loading,discussion} = this.props;

        if (loading) {
            return (
                <Card loading >Loading!!!</Card>
            );
        }

        const {title,id,text,createdAt,category,replies} = discussion;

        return(
            <div>
                    <DiscussionView discussion={{title,category,id,text,createdAt}}  discussionDelete={this.props.discussionDelete}/>
                    <CommentsView discussion={{category,replies}} onSubmit={this.props.onSubmit} discussionReply={this.props.discussionReply}   />
            </div>
        );
    }

}

const WrappedDiscussions = Form.create()(Discussions);
export default withRouter(WrappedDiscussions);