/**
 * Created by Павел on 31.01.2018.
 */
import React, { PropTypes } from 'react';
import { Form,Card,Icon,Avatar,List} from 'antd';
import {withRouter} from "react-router-dom";
import moment from 'moment';


const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

class Replies extends React.Component{
    state = { visible: false ,id:null}
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
        const {edges} = replies;
console.log(edges);
        return(
            <div>

                {edges.length > 0 ? <List
                        loading={loading}
                        itemLayout="vertical"
                        dataSource={edges}
                        renderItem={item => (
                            <div>
                                {item.replies.totalCount > 0 && <List
                                    style={{marginLeft:24}}
                                    itemLayout="vertical"
                                    dataSource={item.replies.edges}
                                    renderItem={item => (
                                        <List.Item key={item.id}
                                                   actions={[ moment(item.createdAt).format('LLL'), <IconText type="like-o" text="0" />]}

                                        >

                                            <List.Item.Meta
                                                avatar={<Avatar size="large"></Avatar>}
                                            />
                                            {item.text}
                                        </List.Item>

                                    )}
                                />}
                            </div>
                        )}
                /> : <div>No replies</div>}
    </div>
        );
    }

}

const WrappedReplies = Form.create()(Replies);
export default withRouter(WrappedReplies);

