/**
 * Created by Pavel on 10.01.2018.
 */
import React, { PropTypes } from 'react';
import { Icon,Form,Input,Button,Modal,Card,List,Row,Avatar } from 'antd';
import moment from 'moment';
import { withApollo, gql } from 'react-apollo'
import {withRouter} from "react-router-dom";
import { Link } from 'react-router-dom'
import {
    injectIntl,
    defineMessages,
    FormattedMessage
} from 'react-intl';
import messages from './communityDiscussion.json';
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
        const { intl } = this.props;
        const { getFieldDecorator } = this.props.form;
        const {name,discussions, canAdd} = this.props;


        return(



            <Card
                title={name.toUpperCase()+intl.formatMessage(messages.communityDiscussion)}
                extra={canAdd && <Button type="primary" onClick={this.showModal}>{intl.formatMessage(messages.start)}</Button>}
            >

                <Row>
                    <List
                        loading={loading}
                        itemLayout="vertical"
                        dataSource={discussions}
                        renderItem={item => (
                            <List.Item key={item.id}
                                       actions={[<IconText type="clock-circle-o" text={moment(item.lastReply.createdAt || item.createdAt).format('LLL')} />,<IconText type="eye-o" text={item.views} />, <IconText type="like-o" text="0" />, <Link to={'/discussion/' + item.id} style={{color: 'inherit'}}><IconText type="message" text={item.replies.totalCount} /></Link>]}
                            >

                                <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<Link to={'discussion/' + item.id} style={{color: 'inherit'}}>{item.title}</Link>}
                                    description={item.lastReply.text || item.text}
                                />
                            </List.Item>

                        )}
                    />
                </Row>
                <Modal
                    title={intl.formatMessage(messages.start)}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    okText={intl.formatMessage(messages.submit)}
                    onOk={this.handleSubmit}
                >
                    <Form onSubmit={this.handleSubmit} >
                        <FormItem
                            {...formItemLayout}
                            label={intl.formatMessage(messages.title)}
                        >
                            {getFieldDecorator('title')(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={intl.formatMessage(messages.text)}
                        >
                            {getFieldDecorator('text')(
                                <TextArea autosize />
                            )}
                        </FormItem>

                    </Form>
                </Modal>
            </Card>
        );
    }

}

const WrappedCommunityDiscussions = Form.create()(CommunityDiscussions);


export default withApollo(withRouter(injectIntl(WrappedCommunityDiscussions)));
