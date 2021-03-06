import React from 'react';
import {injectIntl} from 'react-intl';
import {Form, Input} from 'antd';
import {compose, withHandlers, withState, withProps} from 'recompose';
import {Attachments, prepareAttachmentsForForm} from "../../../../../../../../components/FormCustomFields/components/Attachments/index";
import messages from './messages';
import { FootnoteFormField } from '../../../../../../../../components/Footnote/components/Manager/field';
const FormItem = Form.Item;
const TextArea = Input.TextArea;

const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};
const formTailLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19, offset: 5},
};

const ClinicalNoteElementBuilder = (props) => {
    const {form, intl, details, attachments=[]} = props;
    const {getFieldDecorator} = form;
    const {title, note, footnote} = details || {};

    // getFieldDecorator('attachments', {initialValue: []});
    // console.log(prepareAttachmentsForForm(attachments));
    getFieldDecorator('attachments', {initialValue: prepareAttachmentsForForm(attachments)});
    
    return (
        <React.Fragment>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.title)}
            >
                {getFieldDecorator('title', {
                        initialValue:title,
                        rules: [{required: true, message: "Enter Title", whitespace: true}],
                    }
                )(
                    <Input  ref={(input) => input && input.focus()}  />
                )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.note)}
            >
                {getFieldDecorator('note', {
                        initialValue:note,
                    }
                )(
                    <Input.TextArea />
                )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label="Attachments"
            >
                <Attachments onClose={props.onCloseAttachments} attachments={attachments} />
            </FormItem>
            <FormItem
            {...formItemLayout}
            label="Footnote"
            >
             {getFieldDecorator('footnote', {
                initialValue: footnote,
            })(
                <FootnoteFormField />
            )}
            </FormItem> 
        </React.Fragment>
    );
}


const enhance = compose(
    injectIntl,
    withProps(props => {
        const {details={}} = props;
        const {attachments = []} = details;
        return {
            attachments
        }
    }),
    withState('attachments', 'setAttachments', props => props.attachments || []),
    withHandlers({
        onCloseAttachments: props => result => {
            const {form, attachments:attachmentsInitial=[]} = props;
            const files = form.getFieldValue('attachments');
            const attachments = [...files, result];
            let attachmentsForm = [];


            attachments.map(attachment => {
                //console.log();
                const {uploads = []} = attachment;
                const fields = uploads.map(upload => {
                    const {type, url, name:label=''} = upload;
                    console.log(type);
                    switch (type) {
                        case 'video':
                            return {id:'', label: label, type: 'video', url:url};
                            break;
                        case 'image':
                            return {id:'', label: label, type: 'image', url:url};
                            break;
                        default:
                            return {id:'', label: label, type: type, url:url};
                            break;
                    }
                    return null;
                });

                //attachmentsView.push(fields);
                if (fields.length > 0) {
                    attachmentsForm = [...attachmentsForm, ...fields]
                    //attachmentsForm.push(fields[0]);
                    return fields[0];
                }
                return null;
            });

            const attachmentsView = [...attachmentsInitial, ...attachmentsForm];

            //attachmentsView = [...attachmentsView],
            //console.log(attachmentsPure);
            form.setFieldsValue({
                attachments
            });
            props.setAttachments(attachmentsView);
        }
    })
);

export default enhance(ClinicalNoteElementBuilder);