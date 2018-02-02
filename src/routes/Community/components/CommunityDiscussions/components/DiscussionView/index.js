/**
 * Created by Павел on 31.01.2018.
 */
import React, { PropTypes } from 'react';
import { Form,Card,Row,Popconfirm,Tooltip,Icon,Avatar } from 'antd';
import moment from 'moment';
import {withRouter} from "react-router-dom";



class DiscussionView extends React.Component{

    constructor(props) {
        super(props);
    }

    handleClick = () => {
        const { discussion, discussionDelete, history } = this.props;
        discussionDelete(discussion.id).then(({data}) => {
            history.push("/community/"+discussion.category.id);
        });
    }


    render(){

        const {loading,discussion} = this.props;
        if (loading) {
            return (
                <Card loading >Loading!!!</Card>
            );
        }

        const {title,text,createdAt} = discussion;

        return(

                <Card
                    title={title}
                    extra={<Popconfirm title="Are you sure delete this discussion?" onConfirm={this.handleClick} okText="Yes" cancelText="No">
                        <Tooltip title={'Delete'}><Icon type="close" /></Tooltip>
                    </Popconfirm>
                    }
                >
                    <Row>
                        <p>{text}</p>
                    </Row>
                    <Row>

                        <Avatar style={{ verticalAlign: 'middle' }}>N</Avatar> <label>{ moment(createdAt).format('LLL')}</label>

                    </Row>
                </Card>
        );
    }

}

const WrappedDiscussionView = Form.create()(DiscussionView);
export default withRouter(WrappedDiscussionView);
