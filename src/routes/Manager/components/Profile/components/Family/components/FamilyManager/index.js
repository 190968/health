import React from 'react';
import {Card, Transfer, Checkbox, Input, Col, Select, Form, DatePicker, Button,} from 'antd';
import moment from 'moment';
import AvatarWithName from '../../../../../../../User/components/AvatarWithName';

const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';


const FamilyManager = (props) => {
    const {isUpdate=false,form, familyMember, formItemLayout} = props;
    console.log(props);
    const {getFieldDecorator} = form;
    const {user, firstName,
        lastName,
        email,
        role,
        canReport} = familyMember || {};
        console.log(role, canReport);
    // const {email='', gender='',fullName='',birthday='', phoneFormatted={},addressText={}, chemotherapies=[]} = patient;
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

        <FormItem
            {...formItemLayout}
            label="Relationship"

        >
            {getFieldDecorator('relationship', {
                initialValue: role,
                rules: [{required: true, message: "intl.messages.user_gender_rule", whitespace: true}],
            })(
                <Select style={{width: 120}}>
                    <Option value="husband">Husband</Option>
                    <Option value="wife">Wife</Option>
                    <Option value="mother">Mother</Option>
                    <Option value="daughter">Daughter</Option>
                    <Option value="father">Father</Option>
                    <Option value="son">Son</Option>
                    <Option value="brother">Brother</Option>
                    <Option value="sister">Sister</Option>
                </Select>
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="Reporting"

        >
            {getFieldDecorator('canReport', {
                initialValue: canReport,
                valuePropName: 'checked'
            })(
                <Checkbox>Allow reporting</Checkbox>
            )}
        </FormItem>

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
        {/* <FormItem
            {...formItemLayout}
            label="Reporting"

        >
            {getFieldDecorator('communication', {})(<Col>
                    <Checkbox>Email</Checkbox>
                    <Checkbox>Phone</Checkbox>
                    <Checkbox>SMS</Checkbox>
                </Col>
            )}
        </FormItem> */}
    </Form>
}

export default FamilyManager;