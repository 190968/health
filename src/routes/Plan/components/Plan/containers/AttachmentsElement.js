import PlanAttachmentsElementPure from '../components/AttachmentsElement';
import {compose, withState, withHandlers} from 'recompose';

const enhance = compose(

    withState('attachments', 'setAttachments', props => props.attachments || []),
    withHandlers({
        onCloseAttachments: props => result => {
            const {form, attachments:attachmentsInitial=[]} = props;
            const files = [];//form.getFieldValue('attachments');
            const attachments = [...files, result];
            let attachmentsForm = [];


            attachments.map(attachment => {
                //console.log();
                const {uploads = []} = attachment;
                const fields = uploads.map(upload => {
                    const {type, url, name:label=''} = upload;
                    // console.log(type);
                    switch (type) {
                        case 'video':
                            return {id:'', label: label, type: 'video', url:url};
                            break;
                        case 'image':
                            return {id:'', label: label, type: 'image', url:url};
                            break;
                        default:
                            return {id:'', label: label, type: type, url:url};
                            break;
                    }
                    return null;
                });

                //attachmentsView.push(fields);
                if (fields.length > 0) {
                    attachmentsForm = [...attachmentsForm, ...fields]
                    //attachmentsForm.push(fields[0]);
                    return fields[0];
                }
                return null;
            });

            const attachmentsView = [...attachmentsInitial, ...attachmentsForm];

            //attachmentsView = [...attachmentsView],
            //console.log(attachmentsPure);
            props.onChange(attachments);
            props.setAttachments(attachmentsView);
        }
    })
);

export const PlanAttachmentsElement = enhance(PlanAttachmentsElementPure);