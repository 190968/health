import React from 'react';
import { Attachments } from '../../../../../../components/FormCustomFields/components/Attachments';

const AttachmentsElement = props => {
    // console.log(props);//
    const {reports} = props;
    if (reports) {
        console.log(reports, 'reports');
        return <>
        <Attachments attachments={reports}  onClose={props.onCloseAttachments} />
        </>;
    } else {
        return <Attachments  onClose={props.onCloseAttachments} />;
    }
}

export default AttachmentsElement;