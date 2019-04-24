import React from 'react';
import {compose, withHandlers, withState} from 'recompose';
import { Attachments } from './index';
const allowedFileTypes = ['image/*'];


const SimpleUploadPure = props => {
    const {image, template} = props;
    // const {thumb} = plan || {};
    // const {large, wide} = thumb || {};
    return <>
            {image && <div style={{marginBottom:5}}><img src={image} style={{width:275}} /></div>}
            <Attachments onClose={props.onCompleteUploadModal} /*attachments={attachments}*/ limit={1}
                             uploadOpts={
                                 allowedFileTypes
                            }
                            buttonLabel={image ? 'Change' : 'Upload'}
                             template={template}
                />
 
    </>
}

const enhance = compose(
    withState('image', 'setImage', props => {
        const {value} = props;
        if (typeof value === 'string') {
            return value;
        } else {
            const {url} = value;
            return url;
        }
    }),
    withHandlers({
        onCompleteUploadModal: props => (attachment=null) => {

            //console.log();
            const {uploads = []} = attachment;
            const fields = uploads.map(upload => {
                const {type, url, name='', size=0} = upload;
                return {id:'', label: name, type, url, size};
            });

            if (fields.length > 0) {
                const image_info = fields[0];
                const {url} = image_info || {};
                props.setImage(url);
            }
            props.onChange({transloadit:attachment});
        },
    })
)
export const SimpleUpload = enhance(SimpleUploadPure);