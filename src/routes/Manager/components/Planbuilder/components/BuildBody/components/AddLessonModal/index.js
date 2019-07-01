import React from 'react';
import { Form,Modal,Input} from 'antd';
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
const FormItem = Form.Item;

class AddLessonModal extends React.Component{

    componentDidMount () {
        setTimeout(() => this.input.focus(), 0)
    }

    handleModalSubmit = () => {
        const { submitLesson } = this.props;
        this.props.form.validateFields((err, values) => {
            if(!err)
            {
                submitLesson(values.title);
            }
        });
    }

    render(){

        const {intl}=this.props;
        const {getFieldDecorator} = this.props.form;

        return(
            <Modal
                title={intl.formatMessage(messages.modalTitle)}
                visible={true}
                onCancel={this.props.onHide}
                okText={'Save'}
                onOk={this.handleModalSubmit}
            >
                <Form>
                    <FormItem>
                        {getFieldDecorator('title',{
                                rules: [{ required: true, message:"Input title Please" , whitespace: true }],
                            }
                        )(
                            <Input placeholder="Lesson title"  ref={node => this.input = node} />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }

}
const WrappedAddLessonModal = Form.create()(AddLessonModal);
export default injectIntl(WrappedAddLessonModal);

