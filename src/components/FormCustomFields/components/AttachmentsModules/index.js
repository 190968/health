import React from 'react';
import AttachmentsModulesItem from './containers/Item';
import AttachmentsModulesButton from './components/Button';
import { ListWithMessage } from '../../../UI/List';
import { prepareMedicationInput } from '../../../../routes/Plan/components/MedicationPlan/components/Medication/containers/MedicationManager';
import { prepareTrackerInput } from '../../../../routes/Plan/components/BiometricPlan/containers/TrackerManager';
import { prepareDMEInput } from '../../../DME/containers/Manager';
import { prepareTimeInput } from '../../../../utils/datetime';

const AttachmentsModules = props => {
    const { value: attachments = [], buttonLabel, managerProps, emptyMessage=false, noEmptyImage, updateAttachments, deleteAttachment, editable=true, disabled=false, attachmentLabel, ...otherProps } = props;
    const items = attachments;
    return <React.Fragment>
        <ListWithMessage
            emptyMessage={emptyMessage}
            noImage={noEmptyImage}
            itemLayout="horizontal"
            pagination={false}
            size={'small'}
            dataSource={items}
            renderItem={(attachment, i) => {
                return <AttachmentsModulesItem key={i} i={i} {...otherProps} attachment={attachment} editable={editable} deleteAttachment={deleteAttachment} updateAttachment={updateAttachments} attachmentLabel={attachmentLabel} managerProps={managerProps} />
            }}
        />
        {(!disabled && editable) && <AttachmentsModulesButton buttonLabel={buttonLabel} updateAttachments={updateAttachments} attachments={attachments} managerProps={managerProps} {...otherProps} />}
    </React.Fragment>
}

export default AttachmentsModules;


export const prepareTaskAttachmentInput = valueAttachments => {
    return valueAttachments.map(attachment => {
        const {id, object, type, attachmentStatus, ...otherProps} =  attachment;
        // console.log(attachment, 'attachment');
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
                objectInput.assessment = {startDate, endDate, dows, startTime: prepareTimeInput(startTime)};
                break;
            case 'medication':
                //const {schedule} = object || {};
                objectInput.medication = prepareMedicationInput(object);
                break;
            case 'tracker':
                //const {schedule} = object || {};
                objectInput.tracker = prepareTrackerInput(object);
                break;
            case 'dme':
                //const {schedule} = object || {};
                objectInput.dme = prepareDMEInput(object);
                break;
        }

        return {...otherProps, id, type, objectInput};
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