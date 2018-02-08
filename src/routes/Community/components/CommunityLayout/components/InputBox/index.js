/**
 * Created by Павел on 31.01.2018.
 */
import React, { PropTypes } from 'react';
import { Form,Col,Button,Input,Icon,Avatar } from 'antd';
import messages from './messages';
import {
    injectIntl,
} from 'react-intl';
const FormItem = Form.Item;

class InputBox extends React.Component{

    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            return onSubmit(values).then(({data}) => {
                this.props.form.resetFields();
            })
        });
    }
        render(){
            const {discussion} = this.props;
            const {category} = discussion;
            const {isJoined} = category;
            const {intl}=this.props;
            const { getFieldDecorator } = this.props.form;
        return(
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
        );
    }
}

export default injectIntl(InputBox);
