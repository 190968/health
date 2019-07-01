import React from 'react';
import {Form, Input} from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 4},

    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 20},
    },
};

const PersonalNoteManager = props => {
    const { personalNote, form} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {title, note} = personalNote || {};
    // const {form, intl, details, attachments=[]} = props;
    // const {getFieldDecorator} = form;
    // const {title, note, footnote} = details || {};

    // getFieldDecorator('attachments', {initialValue: []});
    // console.log(prepareAttachmentsForForm(attachments));
    // getFieldDecorator('attachments', {initialValue: prepareAttachmentsForForm(attachments)});
    
    return (
        <React.Fragment>
            <FormItem
                {...formItemLayout}
                label={'Title'}
            >
                {getFieldDecorator('title', {
                        initialValue:title,
                        rules: [{required: true, message: "Enter Title", whitespace: true}],
                    }
                )(
                    <Input ref={(input) => input && input.focus()}  />
                )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={'Note'}
            >
                {getFieldDecorator('note', {
                        initialValue:note,
                    }
                )(
                    <Input.TextArea />
                )}
            </FormItem>

            {/* <FormItem
                {...formItemLayout}
                label="Attachments"
            >
                <Attachments onClose={props.onCloseAttachments} attachments={attachments} />
            </FormItem> */}
            {/* <FormItem
            {...formItemLayout}
            label="Footnote"
            >
             {getFieldDecorator('footnote', {
                initialValue: footnote,
            })(
                <FootnoteFormField />
            )}
            </FormItem>  */}
        </React.Fragment>
    );
}

export default PersonalNoteManager;
