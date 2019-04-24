import React from 'react';
import { Card, Row, Col } from 'antd';
import { SideToSide } from '../../../../../../../../components/Layout/Flexbox';
import { Attachments } from '../../../../../../../../components/FormCustomFields/components/Attachments';
import { compose, withHandlers, withState } from 'recompose';

const allowedFileTypes = ['image/*'];
const PlanBuilderThumbnails = props => {
    const {image} = props;
    // const {thumb} = plan || {};
    // const {large, wide} = thumb || {};
    return <Card title={'Plan Photo'}>
            {image && <div style={{marginBottom:5}}><img src={image} style={{width:275}} /></div>}
            <Attachments onClose={props.onCompleteUploadModal} /*attachments={attachments}*/ limit={1}
                             uploadOpts={
                                 allowedFileTypes
                            }
                            buttonLabel={image ? 'Change' : 'Upload'}
                             template={'plan_thumbnails'}
                />

    {/* <SideToSide>
    <div style={{marginRight:10}}><img src={large} style={{height:170}} width={'width:275px;'} /></div>
    <img src={wide} style={{maxHeight:170}} width={'100%'} />
    </SideToSide> */}
    {/* <Row gutter={16}>
      <Col xs={6}>
        
      </Col>
      <Col xs={18}>
      
      </Col>
    </Row> */}
    </Card>
}

const enhance = compose(
    withState('image', 'setImage', props => props.value),
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
            // console.log(attachment);
            // console.log(fields);
            // //attachmentsView = [...attachmentsView],
            // //console.log(attachmentsPure);
            // form.setFieldsValue({
            //     attachment: {}
            // });
            // props.setAttachments(fields);
            props.onChange({transloadit:attachment});
        },
    })
)
export default enhance(PlanBuilderThumbnails);