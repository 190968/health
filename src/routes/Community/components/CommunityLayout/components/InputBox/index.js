/**
 * Created by Павел on 31.01.2018.
 */
import React, { PropTypes } from 'react';
import { Form,Row, Col,Button,Input,Icon,Avatar } from 'antd';
import messages from './messages';

import {
    injectIntl,
} from 'react-intl';
const FormItem = Form.Item;
const { TextArea } = Input;

class InputBox extends React.Component{

    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            if(err!=null)
            {
                return null;
            }
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
            <Row type="flex" justify="space-between" align="middle">
            <Col span={2}>
                <Avatar  size="large" style={{ verticalAlign: 'middle' }}>N</Avatar>
            </Col>
            <Col span={19}>
                <FormItem style={{margin:0}}>
                    {getFieldDecorator('text', {
                        rules: [{ required: true, message:"Input text Please" , whitespace: true }],
                    })(

                        <TextArea
                            suffix={<Icon type="paper-clip" />}
                            autosize={{ minRows: 2}}
                        />

                    )}
                </FormItem>
            </Col>
            <Col offset={1} span={2}>
                {
                    isJoined ? <Button type="primary" size="large" htmlType="submit">{intl.formatMessage(messages.post)}</Button>:<Button disabled type="primary"  size="large" htmlType="submit">{intl.formatMessage(messages.post)}</Button>
                }
            </Col>
            </Row>
        </Form>
        );
    }
}

const WrappedInputBox = Form.create()(InputBox);
export default injectIntl(WrappedInputBox);
