/**
 * Created by Павел on 31.01.2018.
 */
import React, { PropTypes } from 'react';
import { Form,Card,Icon,Avatar } from 'antd';
import {withRouter} from "react-router-dom";
const FormItem = Form.Item;
const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);
const format = 'MMMM Do YYYY, h:mm:ss a';
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    },
};

class Discussions extends React.Component{
    state = { visible: false ,id:null}
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

    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            return onSubmit(values);
        });
    }
    handleModalSubmit = () => {
        const { discussionReply } = this.props;
        this.props.form.validateFields((err, values) => {
            discussionReply(values.textReply,this.props.match.params.id,this.state.id).then(({data}) => {
                this.setState({
                    visible: false,
                });
            });

        });
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

        const {title,text,createdAt,category,replies} = discussion;
        const {edges} = replies;
        const {isJoined} = category;
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <DiscussionView discussion={{title,text,createdAt}} />
                <CommentsView discussion={{category}} onSubmit={this.props.onSubmit}   />
            </div>
        );
    }

}

const WrappedDiscussions = Form.create()(Discussions);
export default withRouter(WrappedDiscussions);

// <Modal
//     title="Reply"
//     visible={this.state.visible}
//     onCancel={this.handleCancel}
//     okText="Send"
//     onOk={this.handleModalSubmit}
// >
//     <Form onSubmit={this.handleModalSubmit} >
//         <FormItem>
//             {getFieldDecorator('textReply')(
//
//                 <Input
//                     suffix={<Icon type="paper-clip" />}
//                 />
//
//             )}
//         </FormItem>
//     </Form>
//
// </Modal>
// <Row>
// <List
// loading={loading}
// itemLayout="vertical"
// dataSource={edges}
// renderItem={item => (
//     <List.Item key={item.id}
//                actions={[ moment(item.createdAt).format('LLL'), <IconText type="like-o" text="0" />, <IconText type="message" text={item.replies.totalCount} onClick={this.showModal.bind(this,item.id)} />, <Tooltip title={'Reply'}><p onClick={this.showModal.bind(this,item.id)} >Reply</p></Tooltip>]}
//
//     >
//
//         <List.Item.Meta
//             avatar={<Avatar size="large"></Avatar>}
//         />
//         {item.text}
//
//         {item.replies.totalCount > 0 && <List
//             style={{marginLeft:24}}
//             itemLayout="vertical"
//             dataSource={item.replies.edges}
//             renderItem={item => (
//                 <List.Item key={item.id}
//                            actions={[ moment(item.createdAt).format('LLL'), <IconText type="like-o" text="0" />]}
//
//                 >
//
//                     <List.Item.Meta
//                         avatar={<Avatar size="large"></Avatar>}
//                     />
//                     {item.text}
//                 </List.Item>
//
//             )}
//         />}
//     </List.Item>
//
// )}
// />
// </Row>