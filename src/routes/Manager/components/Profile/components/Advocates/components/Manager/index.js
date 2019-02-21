import React from 'react';
import {Card, Transfer, Checkbox, Input, Col, Select, Form, DatePicker, Button,} from 'antd';
import moment from 'moment';
import AvatarWithName from '../../../../../../../User/components/AvatarWithName';

const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';


const AdvocateManager = (props) => {
    const {form, advocate, formItemLayout} = props;
    console.log(props);
    const {getFieldDecorator} = form;
    const {user, firstName,
        lastName,
        email,
        role,
        canReport} = advocate || {};
    return <Form>

        {user ? <FormItem
            {...formItemLayout}
            label="Family Member"
        >
            <AvatarWithName user={user} />
        </FormItem> : <React.Fragment>
        <FormItem
            {...formItemLayout}
            label="First Name"
            required
        >
            {getFieldDecorator('firstName', {
                 initialValue: firstName,
                rules: [{required: true, message: "intl.messages.user_first_name_rule", whitespace: true}],
            })(
                <Input/>
            )}

        </FormItem>
        <FormItem
            {...formItemLayout}
            label="Last Name"
            required
        >
            {getFieldDecorator('lastName', {
               
                initialValue: lastName,
                rules: [{required: true, message: "intl.messages.user_first_name_rule", whitespace: true}],
            })(
                <Input/>
            )}

        </FormItem>
        </React.Fragment>}

        {!user && <FormItem
            {...formItemLayout}
            label="Email"

        >{getFieldDecorator('email', {
            initialValue:email,
            rules: [{required: true, message: "Enter email", whitespace: true}],
           
        })(
            <Input/>
        )}
        </FormItem>}
    </Form>
}

export default AdvocateManager;