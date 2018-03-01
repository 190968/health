import React from 'react';
import { Form,Modal,Input} from 'antd';
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
const FormItem = Form.Item;

class PlanElementEditModal extends React.Component{

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
                okText={intl.formatMessage(messages.send)}
                onOk={this.handleModalSubmit}
            >
                elmenent here
            </Modal>
        );
    }

}
const WrappedPlanElementEditModal = Form.create()(PlanElementEditModal);
export default injectIntl(WrappedPlanElementEditModal);

