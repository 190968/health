/**
 * Created by Павел on 31.01.2018.
 */
import React from 'react';
import { Form, Comment, Row, Col,Button,Input,Icon } from 'antd';
import Avatar from '../../../../../User/components/Avatar';
import messages from './messages';

import {
    injectIntl,
} from 'react-intl';
import AvatarWithName from '../../../../../User/components/AvatarWithName';
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
            const {discussion,user} = this.props;
            const {category} = discussion;
            const {isJoined} = category;
            const {intl}=this.props;
            const { getFieldDecorator } = this.props.form;
        return(
        <Form onSubmit={this.handleSubmit} >


            <Comment
                // actions={actions}
                // author={<AvatarWithName user={user} onlyName/>}
                avatar={
                    <AvatarWithName user={user} onlyAvatar/>
                }
                content={
                    <>
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
                <div style={{textAlign:'right'}}>
                {
                    isJoined ? <Button type="primary" htmlType="submit">{intl.formatMessage(messages.post)}</Button>:<Button disabled   htmlType="submit">{intl.formatMessage(messages.post)}</Button>
                }</div>
                    </>
                }
            />

        </Form>
        );
    }
}

const WrappedInputBox = Form.create()(InputBox);
export default injectIntl(WrappedInputBox);
