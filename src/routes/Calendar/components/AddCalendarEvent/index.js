
import React, { PropTypes } from 'react';
import { Form,Select,Modal,Input, DatePicker, TimePicker, message} from 'antd';
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
const { TextArea } = Input;
const FormItem = Form.Item;



const formItemLayout = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 6},

    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

class AddCalendarEvent extends React.Component{
    state = {}


    handleSubmit = () => {
        const { sendMessage } = this.props;
        this.props.form.validateFields((err, values) => {

            console.log(values);
            if (!err) {
                return sendMessage(values).then(() => {
                    message.success(this.props.intl.formatMessage(messages.sent));
                    this.props.onCancel();
                });
            }
        });
    }

    render(){

        const {intl} = this.props;
        const {getFieldDecorator} = this.props.form;

        return(
            <Modal
                title={intl.formatMessage(messages.modalTitle)}
                visible={true}
                onCancel={this.props.onCancel}
                okText={intl.formatMessage(messages.send)}
                onOk={this.handleSubmit}
            >
                <Form onSubmit={this.handleModalSubmit} >

                    <FormItem
                        {...formItemLayout}
                        label={intl.formatMessage(messages.subject)}
                    >
                        {getFieldDecorator('title',{
                                rules: [{ required: true, message:"Enter Title" , whitespace: true }],
                            }
                        )(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label={intl.formatMessage(messages.date)}
                    >
                        {getFieldDecorator('date',{
                                rules: [{ required: true, message:"Select date" }],
                            }
                        )(
                            <DatePicker />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label={intl.formatMessage(messages.time)}
                    >
                        {getFieldDecorator('time', {
                                rules: [{ required: true, message:"Select Time"}],
                            }
                        )(
                            <TimePicker format={'h:mm a'} minuteStep={30} use12Hours={true}/>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label={intl.formatMessage(messages.duration)}
                    >
                        {getFieldDecorator('duration', {
                                rules: [{ required: true, message:"Select Duration"}],
                            }
                        )(
                            <Select >
                                <Select.Option key={1}></Select.Option>
                            </Select>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label={intl.formatMessage(messages.type)}
                    >
                        {getFieldDecorator('type', {
                            rules: [{ required: true, message:"Select Type"}],
                            }
                        )(
                            <Select >
                                <Select.Option key={1}></Select.Option>
                            </Select>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label={intl.formatMessage(messages.message)}
                    >
                        {getFieldDecorator('message'
                        )(
                            <TextArea />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }

}
const AddCalendarEventForm = Form.create()(AddCalendarEvent);
export default injectIntl(AddCalendarEventForm);

