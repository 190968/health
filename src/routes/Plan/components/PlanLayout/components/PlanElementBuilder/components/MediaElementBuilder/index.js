import React from 'react';
import {injectIntl} from 'react-intl';
import {compose, withHandlers, withState} from 'recompose';
import {Form, Input, Radio, Button} from 'antd';
import messages from './messages';
import Upload from '../../../../../../../../components/FormCustomFields/upload';
import MediaPreview from './components/MediaPreview';
import {Attachments, prepareAttachmentsForForm} from "../../../../../../../../components/FormCustomFields/components/Attachments/index";
import { getMediaTypeInfo } from '../../../../../../../../components/FormCustomFields/containers/FileUpload';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};
const formTailLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19, offset: 5},
};
 

const MediaElementBuilder = (props) => {
    //console.log(props);
    const {form, intl,  details, showLoader, typeMedia, tmpMedia, attachments=[]} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {label='', urlConverted, description='', embedHtml, mediaType=''} = details || {};
    //let template = '';
    //let note = '';
    //let allowedFileTypes = ['application/*'];
    let type = mediaType !== '' ? mediaType : typeMedia;
    if (typeMedia === 'import') {
        type = 'video';
    }
    //console.log(typeMedia);
    // switch(type) {
    //     case 'document':
    //         template='document';
    //         break;
    //     case 'ppt':
    //         //note = '.ppt, .pptx';
    //         template = 'ppt';
    //         break;
    //     case 'image':
    //         note = '.jpeg, .jpg, .gif, .tiff, .png, .bmp';
    //         allowedFileTypes = ['image/*'];
    //         template = 'instructions_image';
    //         break;
    //     case 'video':
    //     case 'import':
    //         note = '.avi, .mpg, mpeg, .mov, .mp4, 3gp, .flv, H.263, H.264, .webm';
    //         allowedFileTypes = ['video/*'];
    //         template = 'instructions_video';
    //         break;
    //     case 'audio':
    //         allowedFileTypes = ['audio/*'];
    //         note = '.mp4, .mp3, .mp2';
    //         template = 'mp3';
    //         break;
    //     case 'pdf':
    //         note = '.pdf';
    //         template = 'pdf';
    //         break;
    // }
    let {note, template, allowedFileTypes} = getMediaTypeInfo(type);

    getFieldDecorator('attachment', {initialValue: prepareAttachmentsForForm(attachments, true)});

    getFieldDecorator('file', {
        initialValue:'',
    });

    getFieldDecorator('type', {
        initialValue: type,
    })
    return (
        <React.Fragment>

            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.title)}
            >
                {getFieldDecorator('label', {
                        initialValue:label,
                        rules: [{required: true, message: "Enter Title", whitespace: true}],
                    }
                )(
                    <Input />
                )}
            </FormItem>

            {type === 'video' && <FormItem
                {...formTailLayout}
                // label={'Load type'}
            >
                {getFieldDecorator('uploadType', {
                        initialValue: urlConverted !=='' ? 'embed' : 'upload',
                        // rules: [{required: true, message: "Enter Title", whitespace: true}],
                    }
                )(
                    <RadioGroup >
                        <RadioButton value="upload">Upload</RadioButton>
                        <RadioButton value="embed">Embed</RadioButton>
                    </RadioGroup>
                )}
            </FormItem>}

            {(type === 'video' && getFieldValue('uploadType') === 'embed') && <FormItem
                {...formItemLayout}
                label={'Url'}
            >
                {getFieldDecorator('embedHtml', {
                        initialValue:urlConverted,
                        // rules: [{required: true, message: "Enter Title", whitespace: true}],
                    }
                )(
                    <TextArea autosize={{ minRows: 2, maxRows: 6 }}  />
                )}
            </FormItem> }
            
            
            {(type != 'video' || (type === 'video' && getFieldValue('uploadType') === 'upload')) && <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.upload)}
            >
                <Attachments onClose={props.onCompleteUploadModal} attachments={attachments} limit={1}
                             uploadOpts={
                                 allowedFileTypes
                            }
                             template={template}
                />
            </FormItem>}
        </React.Fragment>
    );
}


const enhance = compose(
    injectIntl,
    withState('showLoader', 'setShowLoader', false),
    withState('tmpMedia', 'setTmpMedia', {}),
    withState('attachments', 'setAttachments', props => {
        const {details={}} = props;

        const {id='', filename='', mediaType:type='', url='', filesize=0} =details;
        if (id === '') {
            return [];
        }
        return [{id:id, label: filename, type: type, url:url, size: filesize}];
    }),
    withHandlers({
        showUploadModal: props => () => {
            props.setShowLoader(true);
        },
        onCompleteUploadModal: props => (attachment=null) => {

            //
            /*if (values) {
                //console.log(props);
                //console.log(values);
                props.form.setFieldsValue({'file': {results:values}});
               //props.onSubmit()
                props.setTmpMedia(values);
            }*/

            //props.setShowLoader(false);





            //console.log(props);
            const {form} = props;

            //console.log();
            const {uploads = []} = attachment;
            const fields = uploads.map(upload => {
                const {type, url, name='', size=0} = upload;
                return {id:'', label: name, type, url, size};
            });

            console.log(attachment);
            console.log(fields);
            //attachmentsView = [...attachmentsView],
            //console.log(attachmentsPure);
            form.setFieldsValue({
                attachment: {transloadit:attachment}
            });
            props.setAttachments(fields);
        },
    })
);

export default enhance(MediaElementBuilder);