import React from 'react';
import AttachmentsModulesItem from './containers/Item';
import AttachmentsModulesButton from './components/Button';
import { ListWithMessage } from '../../../UI/List';

const AttachmentsModules = props => {
    const { value: attachments = [], updateAttachments, deleteAttachment, editable=true, disabled=false, ...otherProps } = props;
    const items = attachments;
    return <React.Fragment>
        <ListWithMessage
            emptyMessage={false}
            itemLayout="horizontal"
            pagination={{
                pageSize: 5,
                hideOnSinglePage: true
            }}
            size={'small'}
            dataSource={items}
            renderItem={(attachment, i) => {
                return <AttachmentsModulesItem key={i} attachment={attachment} editable={editable} deleteAttachment={deleteAttachment} />
            }}
        />
        {(!disabled && editable) && <AttachmentsModulesButton updateAttachments={updateAttachments} attachments={attachments} {...otherProps} />}
    </React.Fragment>
}

export default AttachmentsModules;


export const prepareTaskAttachmentInput = valueAttachments => {
    return valueAttachments.map(attachment => {
        const {object, type, attachmentStatus, ...otherProps} =  attachment;
        const {id:objectId} = object || {};
        let objectInput = {objectId};
        const {schedule} = object || {};
        const {startDate, endDate} = schedule || {};
        switch(type) {
            case 'ap':
                objectInput.plan = {startDate, endDate};
                break;
            case 'up':
                objectInput.userPlan = {startDate, endDate};
                break;
            case 'assessment':
                const {dows, startTime} = schedule || {};
                objectInput.assessment = {startDate, endDate, dows, startTime};
                break;
        }

        return {...otherProps, type, objectInput};
    });
}

export const prepareTaskAttachmentFromType = (type, items) => {
    // console.log(type);
    // console.log(items);
    const attachments = items.map(item => {
        return {
            id:item.id,
            type: type,
            object: item
        }
    });
    // console.log(attachments);
//     object:
// id: "a263"
// name: "Feeding Assessment_NEW"
// schedule: {startDate: Moment, repeating: "onetime", startTime: undefined}
// __typename: "Assessment"
// __proto__: Object
// type: "assessment"

    return attachments;
}