import React, { PropTypes } from 'react';
import { Form,Card,Row,Col,Button,Input,Tooltip,List,Icon,Avatar } from 'antd';
import { withApollo, gql } from 'react-apollo'
import {withRouter} from "react-router-dom";
const FormItem = Form.Item;
const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);
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
    constructor(props){
        super(props);
    }
    handleSubmit = (e) => {

        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            console.log(values);
            return onSubmit(values);
        });

    }

    handleClick = (e) => {

        const { onClick } = this.props;
            return onClick();

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
                    extra={
                        <Tooltip title={'Delete'}><Icon type="close-square" onClick={this.handleClick} /></Tooltip>

                    }
                >
                    <Row>
                          <p>{text}</p>
                        </Row>
                    <Row>

                    <Avatar style={{ verticalAlign: 'middle' }}>N</Avatar> <label>{createdAt.slice(0,10)}</label>

                        </Row>
                </Card><br/>
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
                                           actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}

                                >

                                    <List.Item.Meta
                                        avatar={<Avatar size="large"></Avatar>}
                                        description={item.text}
                                    />
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
export default withApollo(withRouter(WrappedDiscussions));
