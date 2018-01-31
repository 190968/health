import React, { PropTypes } from 'react';
import { Form,Card,Row,Col,Button,Modal,Input,Popconfirm,Tooltip,List,Icon,Avatar } from 'antd';
import moment from 'moment';
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
                console.log(data);
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

                <Card
                    title={title}
                    extra={<Popconfirm title="Are you sure delete this discussion?" onConfirm={this.handleClick} okText="Yes" cancelText="No">
                        <Tooltip title={'Delete'}><Icon type="close" /></Tooltip>
                        </Popconfirm>
                    }
                >

                    <Modal
                        title="Reply"
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        okText="Send"
                        onOk={this.handleModalSubmit}
                    >
                        <Form onSubmit={this.handleModalSubmit} >
                            <FormItem>
                                {getFieldDecorator('textReply')(

                                    <Input
                                        suffix={<Icon type="paper-clip" />}
                                    />

                                )}
                            </FormItem>
                        </Form>

                    </Modal>

                        <Row>
                          <p>{text}</p>
                        </Row>
                    <Row>

                    <Avatar style={{ verticalAlign: 'middle' }}>N</Avatar> <label>{ moment(createdAt).format('LLL')}</label>

                        </Row>
                </Card>
                <Card
                title={
                    <Form onSubmit={this.handleSubmit} >
                            <Col span={2}>
                                <Avatar  style={{ verticalAlign: 'middle' }}>N</Avatar>
                            </Col>
                        <Col span={19}>
                        <FormItem>
                            {getFieldDecorator('text')(

                                    <Input
                                        suffix={<Icon type="paper-clip" />}
                                    />

                            )}
                        </FormItem>
                        </Col>
                            <Col offset={1} span={2}>
                                {
                                    isJoined ? <Button type="primary" htmlType="submit">Post</Button>:<Button disabled type="primary" htmlType="submit">Post</Button>
                                }
                            </Col>
                    </Form>



                }
                >
                    <Row>
                        <List
                            loading={loading}
                            itemLayout="vertical"
                            dataSource={edges}
                            renderItem={item => (
                                <List.Item key={item.id}
                                           actions={[ moment(item.createdAt).format('LLL'), <IconText type="like-o" text="0" />, <IconText type="message" text={item.replies.totalCount} onClick={this.showModal.bind(this,item.id)} />, <Tooltip title={'Reply'}><p onClick={this.showModal.bind(this,item.id)} >Reply</p></Tooltip>]}

                                >

                                    <List.Item.Meta
                                        avatar={<Avatar size="large"></Avatar>}
                                    />
                                    {item.text}

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
                                </List.Item>

                            )}
                        />
                    </Row>
                </Card>
            </div>
        );
    }

}

const WrappedDiscussions = Form.create()(Discussions);
export default withRouter(WrappedDiscussions);
