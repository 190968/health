import React from 'react';
import {Modal, Form, Input} from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

export const modalHOC = (WrappedComponent) => {
    class ModalWrappeer extends React.Component {

        onOk = () => {
            const prepareInput = this.props.prepareInput;
            const callback = this.props.onHide;
            this.props.onSubmit({prepareInput, callback});
        }

        onCancel = () => {
            if (this.props.onHide) {
                this.props.onHide();
            }
        }
        render() {
            //console.log(this.props);
            //console.log(this.state);
            const {loading=false, type='', form, details={}} = this.props;
            //let {id, details} = this.props;
            const {notes=''} = details;

            const modalTitle = type === '' ? 'Select Element' : this.props.getTypeName(type);

            // Wraps the input component in a container, without mutating it. Good!
            return (
                <Modal
                    title={modalTitle}
                    visible={true}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                    width={700}
                >
                    {loading ? 'Loading...' :
                        <React.Fragment>
                            <WrappedComponent {...this.props} formItemLayout={formItemLayout} />
                            <FormItem
                                {...formItemLayout}
                                label="Instructions"
                            >
                                {form.getFieldDecorator('notes', {
                                        initialValue:notes,
                                    }
                                )(
                                    <Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                                )}
                            </FormItem>

                        </React.Fragment>
                    }



                </Modal>);
        }
    }

    //treatmentModal.displayName = `treatmentModal(${getDisplayName(WrappedComponent)})`;

    return ModalWrappeer;
}