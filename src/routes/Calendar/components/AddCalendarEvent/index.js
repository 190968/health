
import React from 'react';
import { Form, Select, Modal, Input, Checkbox, message } from 'antd';
import moment from 'moment';
import AddressForm from '../../../../components/AddressForm';
import PhoneForm from '../../../../components/PhoneForm';
import { DateField, TimeField } from "../../../../components/FormCustomFields/index";
import PeopleSelect from '../../../../components/Autosuggest/containers/PeopleSelect';
import RemindersManagerButton from '../../../../components/Reminders/components/RemindersManagerByTime/components/RemindersManagerButton';
import messages from './i18n/en';
import { FormattedMessage } from 'react-intl';
import AvatarWithName from '../../../User/components/AvatarWithName';

const { TextArea } = Input;
const FormItem = Form.Item;



const formItemLayout = {
    labelCol: {
        xs: { span: 20 },
        sm: { span: 6 },

    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
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


const AddCalendarEvent = props => {

    const { intl, eventTypes=[], eventDurations=[], form, date, user, isSelf, patient } = props;
    const { getFieldDecorator, getFieldValue } = form;

    console.log(user);
    console.log(isSelf);
    const phoneNumberError = form.getFieldError('phone[number]');
    const addressError = false;//form.getFieldError('address');
    //console.log(addressError);
    let typeFields = '';
    switch (getFieldValue('type')) {
        default: break;
        case "inPerson":
            typeFields = <FormItem
                {...formItemLayout}
                label={'Address'}
                validateStatus={addressError ? 'error' : ''}
                help={addressError || ''}
            >
                <AddressForm getFieldDecorator={getFieldDecorator} required />
            </FormItem>
                ;//countries={countries} states={states} address={user.address}
            break;
        case 'phone':
            typeFields = <FormItem
                {...formItemLayout}
                label="Phone"
                required
                validateStatus={phoneNumberError ? 'error' : ''}
                help={phoneNumberError || ''}
            >
                <PhoneForm getFieldDecorator={getFieldDecorator} required />
            </FormItem>
            break;
    }

    
    return (
            <Form onSubmit={props.onSubmit} >
            {patient && <FormItem
                    {...formItemLayout}
                    label={'Patient'}
                >
                    <AvatarWithName user={patient} />
                </FormItem>}

                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage {...messages.subject} />}
                >
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: "Enter Title", whitespace: true }],
                    }
                    )(
                        <Input />
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label="Participants">
                    {getFieldDecorator('participants', {
                    })(
                        <PeopleSelect mode="multiple" group1={'type'}  />
                    )}
                </FormItem>
                {/* <FormItem {...formTailLayout}>
            {getFieldDecorator('around_patient', {})(
                <Checkbox>This message is around the patient</Checkbox>
            )}
            </FormItem>
            {getFieldValue('around_patient') && <FormItem {...formItemLayout} label="Patient">
                {getFieldDecorator('around_patient', {})(
                    <PatientSelect />
                )}
            </FormItem>
            } */}
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage {...messages.date} />}
                >
                    {getFieldDecorator('date', {
                        initialValue: date && moment(date),
                        rules: [{ required: true, message: "Select date" }],
                    }
                    )(
                        <DateField />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage {...messages.time} />}
                >
                    {getFieldDecorator('time', {
                        // initialValue: null,
                        rules: [{ required: true, message: "Select Time" }],
                    }
                    )(
                        <TimeField minuteStep={15} />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage {...messages.duration} />}
                >
                    {getFieldDecorator('duration', {
                        rules: [{ required: true, message: "Select Duration" }],
                    }
                    )(
                        <Select>
                            {eventDurations.map(info => {
                                return <Select.Option key={info.name}>{info.description}</Select.Option>
                            })}
                        </Select>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage {...messages.type} />}
                >
                    {getFieldDecorator('type', {
                        rules: [{ required: true, message: "Select Type" }],
                    }
                    )(
                        <Select>
                            {eventTypes.map(info => {
                                return <Select.Option key={info.name}>{info.description}</Select.Option>
                            })}
                        </Select>
                    )}
                </FormItem>

                {typeFields}

                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage {...messages.message} />}
                >
                    {getFieldDecorator('message'
                    )(
                        <TextArea />
                    )}
                </FormItem>

                {/* <FormItem
                    {...tailFormItemLayout}
                >
                    <RemindersManagerButton asIcon={false} title={'Add Reminders'} />
                </FormItem> */}

                
            </Form>
    );

}
 
export default AddCalendarEvent

