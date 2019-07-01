import ClinicalNoteElementBuilderPure from '../components/ClinicalNoteElementBuilder';
import { prepareAttachmentsInput } from '../../../../../../../components/FormCustomFields/components/Attachments';

export const ClinicalNoteElementBuilder = ClinicalNoteElementBuilderPure;

export default (ClinicalNoteElementBuilderPure);



export const preparePlanElementClinicalNoteInput = (values) => {
    const {title, note, attachments=[], footnote} = values;

    return {
            title,
            note,
            attachments: prepareAttachmentsInput(attachments),
            footnote
            // attachments: attachments.map(a=>prepareFileAtta)
    }
}