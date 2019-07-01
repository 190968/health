import React from 'react';
import { Attachments } from '../Attachments';
import { getMediaTypeInfo } from '../../containers/FileUpload';


const FileUpload = props => {
    const { onCompleteUploadModal, attachments=[], limit, type } = props;

    let { template, allowedFileTypes } = getMediaTypeInfo(type);

    return <Attachments onClose={onCompleteUploadModal} attachments={attachments} limit={limit} uploadOpts={allowedFileTypes} template={template}
    />;
}

export default FileUpload;