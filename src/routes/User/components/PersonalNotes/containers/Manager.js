import Manager from '../components/Manager';
import {compose, withProps, withHandlers} from 'recompose';
import {injectIntl} from 'react-intl';
import { Form, message } from 'antd';
import moment from 'moment';
import { withCreateOrUpdatePersonalNote } from '../mutations.js';
import DefaultI18nEn from '../../../../../i18n/en';
import { withDrawer } from '../../../../../components/Modal';
import { prepareAttachmentsInput } from '../../../../../components/FormCustomFields/components/Attachments';

const enhance = compose(
    injectIntl,
    withCreateOrUpdatePersonalNote,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            const {form, personalNote } = props;

            form.validateFields((err, values) => {
                if (!err) {
                    const input = preparePersonalNoteInput(values);
                    let finish = null;
                    if (personalNote) {
                        finish = props.updatePersonalNote(input)
                    } else{
                        finish = props.createPersonalNote(input);
                    }
                    finish.then(() => {
                        message.success('Saved');
                        if (props.onHide) {
                            props.onHide();
                        }
                         if (props.refetch) {
                             props.refetch();
                         }   
                    });
                }
            });
        },
    }),
    withProps(props => {

        const {intl, personalNote } = props;
        const {id} = personalNote || {};
        const title = intl.formatMessage(DefaultI18nEn.createUpdateSomething, {isUpdate: (id && id !== ''), title: 'Personal Note'})
        return {
            modalTitle: title
        }
    }),
    withDrawer
);
export const PersonalNoteManager = enhance(Manager);

const preparePersonalNoteInput = values => {
    const {title, note, attachments=[], footnote} = values;

    return {
            title,
            note,
            attachments: prepareAttachmentsInput(attachments),
            footnote
    }
    // return values;
}