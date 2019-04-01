import React from 'react';
import { compose, withHandlers, withProps} from 'recompose';
import ClinicalNoteElementBuilderPure from '../components/ClinicalNoteElementBuilder';
import {Form} from 'antd';
import {modalHOC, withSpinnerWhileLoading} from "../modal";
import { prepareAttachmentsInput } from '../../../../../../../components/FormCustomFields/components/Attachments';

export const ClinicalNoteElementBuilder = ClinicalNoteElementBuilderPure;

export default (ClinicalNoteElementBuilderPure);



export const preparePlanElementClinicalNoteInput = (values) => {
    const {title, note, attachments=[]} = values;

    return {
            title,
            note,
            attachments: prepareAttachmentsInput(attachments)
            // attachments: attachments.map(a=>prepareFileAtta)
    }
}