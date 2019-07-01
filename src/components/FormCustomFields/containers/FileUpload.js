import FileUploadPure from '../components/FileUpload';
import {compose, withState, withHandlers} from 'recompose';


export const getMediaTypeInfo = (type) => {
    let template = '';
    let note = '';
    let name = type;
    let allowedFileTypes = ['application/*'];
    switch(type) {
        case 'document':
            template='document';
            name = 'Document';
            break;
        case 'ppt':
            //note = '.ppt, .pptx';
            template = 'ppt';
            break;
        case 'image':
            note = '.jpeg, .jpg, .gif, .tiff, .png, .bmp';
            allowedFileTypes = ['image/*'];
            template = 'instructions_image';
            name = 'Image';
            break;
        case 'video':
        case 'import':
            note = '.avi, .mpg, mpeg, .mov, .mp4, 3gp, .flv, H.263, H.264, .webm';
            allowedFileTypes = ['video/*'];
            template = 'instructions_video';
            name = 'Video';
            break;
        case 'audio':
            allowedFileTypes = ['audio/*'];
            note = '.mp4, .mp3, .mp2';
            template = 'mp3';
            name = 'Audio';
            break;
        case 'pdf':
            note = '.pdf';
            template = 'pdf';
            break;
    }
// console.log({name, template, note, allowedFileTypes});
    return {name, template, note, allowedFileTypes};
}

const enhance = compose(
    withState('attachments', 'setAttachments', props => {
        const {value=[]} = props;
        return value;
        // const {id='', filename='', mediaType:type='', url='', filesize=0} =details;
        // if (id === '') {
        //     return [];
        // }
        // return [{id:id, label: filename, type: type, url:url, size: filesize}];
    }),
    withHandlers({
        showUploadModal: props => () => {
            props.setShowLoader(true);
        },
        onCompleteUploadModal: props => result => {
            // console.log(result);
            // console.log(props);
            const {form, attachments:attachmentsInitial=[]} = props;
            // const files = form.getFieldValue('attachments');
            // const attachments = [...files, result];
            const attachments = [result];
            let attachmentsForm = convertTransloaditUploadIntoView({attachments});
            
            const attachmentsView = [...attachmentsInitial, ...attachmentsForm];

            //attachmentsView = [...attachmentsView],
            // console.log(attachments);
            // console.log(attachmentsView);
            // form.setFieldsValue({
                
            // });
            props.setAttachments(attachmentsView);
            if (props.onChange) {
                props.onChange(attachments);
            }
        }
    })
);

export const FileUpload = enhance(FileUploadPure);


const convertTransloaditUploadIntoView = props => {
    const {attachments=[]} = props;
    let attachmentsForm = [];
    attachments.map(attachment => {
        //console.log();
        const {uploads = []} = attachment;
        const fields = uploads.map(upload => {
            const {type, url, name:label='', size} = upload;
            console.log(upload, 'upload');
            console.log(type);

            return {id:'', label, type, url, size};
            switch (type) {
                case 'video':
                    return {id:'', label: label, type: 'video', url, size};
                case 'image':
                    return {id:'', label: label, type: 'image', url, size};
                default:
                    return {id:'', label: label, type: type, url, size};
            }
        });

        console.log(fields, 'fields');
        //attachmentsView.push(fields);
        if (fields.length > 0) {
            attachmentsForm = [...attachmentsForm, ...fields]
            //attachmentsForm.push(fields[0]);
            return fields[0];
        }
        return null;
    });

    return attachmentsForm;
}