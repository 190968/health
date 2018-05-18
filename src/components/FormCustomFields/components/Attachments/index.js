import React from 'react';
import {Card, Button, Icon, Tooltip, Row, Col} from 'antd';
import {branch, compose, withState, withHandlers} from 'recompose';
import Upload from '../../upload';
import ReactPhotoGrid from 'react-photo-grid';
import Gallery from "../../../Gallery";


const AttachmentsPure = props => {
    const {openUpload=false, hideButton=false, showLoader, toggleLoader, onRequestCloseModal, attachments=[], showPreview=false, uploadOpts, template='attachments', limit=false} = props;
    console.log(attachments);
    return <React.Fragment>

        <AttachmentsList attachments={attachments} showPreview={limit === 1 || showPreview} limit={limit} />
        {!hideButton && <Button onClick={toggleLoader}>{attachments.length > 0 ? (limit === 1 ? 'Change' : 'Upload more') : 'Upload'}</Button>}

        <Upload {...uploadOpts} maxNumberOfFiles={limit}  template={template} /*allowedFileTypes={allowedFileTypes}*/ open={showLoader} onClose={toggleLoader} onComplete={props.onRequestCloseModal} />
    </React.Fragment>
}

const enhance = compose(
    branch(props => !props.showLoader, withState('showLoader', 'setShowLoader', props => props.showLoader || false)),
    withHandlers({
        toggleLoader: props => () => {
            props.setShowLoader(!props.showLoader);
        },
        onRequestCloseModal: props => (values) => {
            console.log(values);
            if (props.onClose) {
                props.onClose(values);
            }
            props.setShowLoader(false);
        }
    })
)

export const Attachments = enhance(AttachmentsPure);


export const AttachmentsList = ({attachments, isEditable=true, showPreview=true, limit = false}) => {
    // filter attachments
    const images = attachments.filter(attachment => {
        return attachment.type === "image";
    });
    const files = attachments.filter(attachment => {
        return attachment.type !== "image";
    });


    let imageData2 = images.map(image => image.url);
    // console.log(imageData2);
    // imageData2 = [
    //     'http://lorempixel.com/400/400/',
    //     'http://lorempixel.com/600/500/',
    //     'http://lorempixel.com/100/800/',
    //     'http://lorempixel.com/500/500/',
    // ];
    // console.log(imageData2);
    if (imageData2.length > 4) {
        imageData2 = imageData2.slice(0, 4);
    }
    //ReactPhotoGrid
    return <React.Fragment>
        {/*<div style={{width:200, height:200, overflow:'hidden'}}><ReactPhotoGrid*/}
            {/*gridSize="400x200"*/}

            {/*//onImageClick={this.handleImageClick}*/}
            {/*data={imageData2} />*/}
        {/*</div>*/}

        <Gallery
            images={images.map(image => ({src:image.url, thumbnail:image.url, orientation: 'landscape'}))}
/>
        <Row gutter={16}>{files.map((attachment, i) => {
        //console.log(attachment);
        let element = '';
        const {type='', label=''} = attachment;

        let image = '';
        let icon = '';
        const actions = false;//isEditable && <Tooltip title="Delete"><Icon type="delete" style={{marginLeft:5}} /></Tooltip>;
        switch(type) {
            case 'image':
                //return null;
                icon = <Icon type="picture" />;
                break;
            case 'video':
                icon = <Icon type="video-camera" />;
                break;
        }

        if (showPreview) {
            switch(type) {
                case 'video':
                element = <video width="100%" controls>
                        <source src={attachment.url} /*type="video/mp4"*/ />
                            Your browser does not support HTML5 video.
                    </video>;
                    break;
                case 'image':
                    element = <img src={attachment.url} alt={label} style={{width:'100%'}} />;
                    break;
                default:
                    element =  <a href={attachment.url} target="_blank">{i + 1}. {image} {label}</a>
                    break;
            }
            if (limit === 1) {
                element = <Col key={i} >{element}</Col>
            } else {
                element = <Col sm={8} md={12} lg={8}  key={i}><Card key={i} type="inner" style={{marginBottom:16}} cover={image}
                                                                     title={<span>{icon} {label}</span>} extra = {actions}>
                    {element}
                </Card></Col>
            }

        } else {
            element = <Col sm={8} md={12}  key={i}>
                <span style={{float:'right'}}>{actions}</span>
                <div>{attachment.url && attachment.url !== '' ?
                <a href={attachment.url} target="_blank">{i + 1}. {image} {label}</a>
                :
                    <Tooltip title="Broken Link. Please reupload the file"><span>{i + 1}. {image} {label}</span></Tooltip>}
            </div>

            </Col>;
        }

        return element;
    })}</Row>
    </React.Fragment>;
}