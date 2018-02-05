/**
 * Created by Павел on 31.01.2018.
 */
import React, { PropTypes } from 'react';
import { Form,Card,Col,Button,Input,Icon,Avatar } from 'antd';
import {withRouter} from "react-router-dom";
import Comment from '../../components/Comment';
import {
    injectIntl,
    defineMessages,
    FormattedMessage
} from 'react-intl';
import messages from './messages';
const FormItem = Form.Item;


class CommentsView extends React.Component{

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

        const {category,replies} = discussion;
        const {isJoined} = category;
        const {intl}=this.props;
        const { getFieldDecorator } = this.props.form;
        return(
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
                                    isJoined ? <Button type="primary" htmlType="submit">{intl.formatMessage(messages.post)}</Button>:<Button disabled type="primary" htmlType="submit">{intl.formatMessage(messages.post)}</Button>
                                }
                            </Col>
                        </Form>
                    }
                >
                    <Comment discussion={{replies}}  discussionReply={this.props.discussionReply} />
                </Card>
        );
    }

}

const WrappedCommentsView = Form.create()(CommentsView);
export default withRouter(injectIntl(WrappedCommentsView));
