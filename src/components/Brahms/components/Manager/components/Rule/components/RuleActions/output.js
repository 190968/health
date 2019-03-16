import React from 'react';
import {Input,Form} from 'antd';
import { compose,withStateHandlers, withState } from 'recompose';
import { Attachments, prepareAttachmentsForForm } from '../../../../../../../FormCustomFields/components/Attachments';
const TextArea = Input.TextArea;
const FormItem = Form.Item;

const BrahmsRuleActionOutputPure = props => {
    // console.log(props);
    const {message, attachmentsView, onChange, formItemLayout} = props;
    // return <Wysiwyg value={message} onChange={onChange} />
    return <>
        <FormItem
            // {...formItemLayout}
            // label={'Message'}
        >
    <TextArea autosize={{ minRows: 2, maxRows: 6 }} value={message} onChange={onChange} />
    </FormItem>
    <FormItem
            // {...formItemLayout}
            // label={'Attachments'}
        >
    <Attachments onClose={props.onCloseAttachments} attachments={attachmentsView} />
    </FormItem>
    </>
}

const enhance = compose(
    withStateHandlers( props => {
        const {value} = props;
        // const {outputActionInput} = value || {};
        const {message, attachments} = value || {};
        return {message, attachmentsView:attachments, attachments/*:prepareAttachmentsForForm(attachments)*/};
    }, {
        onChange: (state, props) => (e) => {
            const value = e.target.value;
            const {attachments} = state;
            // const input = prepareBrahmsOutputActionInput({message:value, attachments});
            // console.log(input);
            props.onChange({message:value, attachments});
            return {
                message:value
            }
        },



        onCloseAttachments: (state, props) => result => {
            const {message, attachments:attachmentsInitial=[]} = state;
            // console.log(result, 'result');
            // const files = ;//form.getFieldValue('attachments');
            const attachments = [...attachmentsInitial, result];
            let attachmentsForm = [];
            // console.log(attachmentsInitial, 'attachmentsInitial');
            // console.log(attachments, 'attachmentsattachments');


            const attachmentsPure = attachments.map(attachment => {
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
            // form.setFieldsValue({
            //     attachments
            // });
            // const input = prepareBrahmsOutputActionInput({message, attachments});
            // props.onChange(input);
            props.onChange({message, attachments});
            return {
                attachments,
                attachmentsView
            }
        }

    })
);
export const BrahmsRuleActionOutput = enhance(BrahmsRuleActionOutputPure);

export const prepareBrahmsOutputActionInput = value => {
    console.log(value, 'valuevaluevaluevalue');
    const {message, attachments=[]} = value;
    return {message, attachments:attachments.map(a=> {
        const {id} = a;
        if (id) {
            return {existedId:id}
        }
        return {transloadit:a};
    })};
}
