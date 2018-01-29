/**
 * Created by Pavel on 10.01.2018.
 */
import React, { PropTypes } from 'react';
import { Icon,Form,Input,Button,Modal,Card,List,Row,Avatar } from 'antd';
import { withApollo, gql } from 'react-apollo'
import { Link } from 'react-router-dom'
const FormItem = Form.Item;
const { TextArea } = Input;
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
class CommunityDiscussions extends React.Component{
    state = { visible: false }
    constructor(props){
        super(props);
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleSubmit = (e) => {

        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
           console.log(values);
            return onSubmit(values);
        });
    }
    render(){

        const {loading} = this.props;
        if (loading) {
            return (
                <Card loading  title="Main Categories">Loading!!!</Card>
            );
        }
        const { getFieldDecorator } = this.props.form;
        const {name,discussions, canAdd} = this.props;


        return(



            <Card
                title={name.toUpperCase()+" Community Discussions"}
                extra={canAdd && <Button type="primary" onClick={this.showModal}>Start discussion</Button>}
            >
                <Row>
                    <List
                        loading={loading}
                        itemLayout="vertical"
                        dataSource={discussions}
                        renderItem={item => (
                            <List.Item key={item.id}
                                       actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}

                            >

                                <List.Item.Meta
                                    avatar={<Avatar size="large"></Avatar>}
                                    title={<Link to={'/discussion/' + item.id} style={{color: 'inherit'}}>{item.title}</Link>}
                                    description={item.text.substr(0, 100)}
                                />
                            </List.Item>

                        )}
                    />
                </Row>
                <Modal
                    title="Start discussion"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form onSubmit={this.handleSubmit} >
                        <FormItem
                            {...formItemLayout}
                            label="Title"
                        >
                            {getFieldDecorator('title')(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Text"
                        >
                            {getFieldDecorator('text')(
                                <TextArea autosize />
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" className="register-form-button">
                                Send
                            </Button>
                        </FormItem>
                    </Form>
                </Modal>
            </Card>
        );
    }

}

const WrappedCommunityDiscussions = Form.create()(CommunityDiscussions);
export default withApollo(WrappedCommunityDiscussions);
