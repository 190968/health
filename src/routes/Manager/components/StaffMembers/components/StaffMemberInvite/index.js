import React from 'react';
import {Input, Select, Form,} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

const TeamManager = ({form, formItemLayout, targetKeys, selectedKeys, handleChange, handleSelectChange}) => {


    const {getFieldDecorator} = form;
    // const {email='', gender='',fullName='',birthday='', phoneFormatted={},addressText={}, chemotherapies=[]} = patient;
    const children = [];
    return <Form layout='vertical'>
        <FormItem
            label="Enter in the email address of who you would like to invite"
            extra="You can send several invitations by pressing Enter after each."
        >
            {getFieldDecorator('emails', {})(
                <Select
                    mode="tags"
                    style={{width: '100%'}}
                    tokenSeparators={[',']}
                    notFoundContent={false}
                >
                </Select>
            )}
        </FormItem>
        <FormItem
            label="Optional Message to Recipients(s)"
        >
            {getFieldDecorator('message', {})(
                <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
            )}
        </FormItem>
    </Form>
}

export default TeamManager;