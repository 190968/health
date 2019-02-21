import React from 'react';
import { Form, Select, Input, Radio } from 'antd';
import moment from 'moment';
import { DateField } from '../../../../../../../../../../components/FormCustomFields';
// import PhoneField from '../../../../../../../../../../components/FormCustomFields/components/Phone';
// import PhoneForm from '../../../../../../../Patients/components/PatientInvite/components/NetworkForm/components/FormFieldElement/PhoneField';
import PatientTeamMembersSelect from '../../../../../../../../../../components/Autosuggest/containers/PatientTeamMembersSelect';
const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const FormItem = Form.Item;
const Option = Select.Option;

const OutreachManager = props => {
    const {form, outreach, user} = props;
    const {getFieldDecorator} = form;
    console.log(outreach);
    const {subject, date, type, details, participants=[]} = outreach || {};
    return <Form>
        
        <FormItem
            {...formItemLayout}
            label='Subject'
        >
            {getFieldDecorator('subject', {
                     initialValue: subject,
                    rules: [{required: true, message: "Enter Subject"}],
                }
            )(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Type'
        >
            {getFieldDecorator('type', {
                     initialValue: type,
                    rules: [{required: true, message: "Select Type"}],
                }
            )(
                <Select >
                    <Option value="phone">Phone</Option>
                    <Option value="video">Video</Option>
                    <Option value="email">Email</Option>
                </Select>
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Date'
        >
            {getFieldDecorator('date', {
                     initialValue: date ? moment(date) : undefined,
                    rules: [{required: true, message: "Select Date"}],
                }
            )(
                <DateField />
            )}
        </FormItem>

        

       

        {/* <FormItem
            {...formItemLayout}
            label='Phone'
        >
            {getFieldDecorator('phone', {
                    initialValue: phone,
                }
            )(
                <PhoneForm />
            )}
        </FormItem> */}

        <FormItem
            {...formItemLayout}
            label='Participants'
        >
            {getFieldDecorator('participants', {
                initialValue: participants,
            })(
                <PatientTeamMembersSelect user={user} mode={'multiple'} />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label='Notes'
        >
            {getFieldDecorator('notes', {
                    initialValue: details,
                }
            )(
                <Input />
            )}
        </FormItem>
 
    </Form>
}

export default OutreachManager;