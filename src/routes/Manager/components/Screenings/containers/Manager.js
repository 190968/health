import Manager from '../components/Manager';
import {compose, withProps, withHandlers, renderComponent, branch} from 'recompose';
import { withDrawer } from '../../../../../components/Modal';
import {injectIntl} from 'react-intl';
import DefaultI18nEn from '../../../../../i18n/en';
import {ScreeningView} from './View';
import { Form } from 'antd';
import moment from 'moment';
import {withCreateOrUpdateScreening} from '../mutations.js';
import { prepareTaskAttachmentInput } from '../../../../../components/FormCustomFields/components/AttachmentsModules';

const enhance = compose(
    injectIntl,
    withCreateOrUpdateScreening,
    branch(props => {
        const {screening} = props;
        const {isExecuted} = screening || {};
        return isExecuted;
    }, renderComponent(ScreeningView)),
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            const {form, screening} = props;

            form.validateFields((err, values) => {
                console.log(props);
                if (!err) {
                    
                    const input = prepareScreeningInput(values);
                    let finish = null;
                    if (screening) {
                        finish = props.updateScreening(input)
                    } else{
                        finish = props.createScreening(input);
                    }
                    finish.then(() => {
                        if (props.onHide) {
                            props.onHide();
                        }
                         if (props.refetch) {
                             props.refetch();
                         }   
                    });
                    // const {userId, tagId, tagType} = props;
                    // const {message, attachments} = values;
                    // return props.sendMessage({userId, tagId, tagType, message, attachments}).then(() => {
                    //     messageModal.success('Sent');
                    //     // reset form
                    //     form.resetFields();
                    // });
                }
            });
        },
        disabledDate: props => (current) => {
            // Can not select days before today and today
            return current && current < moment().startOf('day');
        },

        // checkEndDate: props => (endValue) => {
        //     const {form} = props;
    
        //     const executeDate = form.getFieldValue('executeDate');
        //     //const startValue = this.state.startValue;
             
        //     return endValue.valueOf() <= startValue.valueOf();
        // },
    }),
    withProps(props => {

        const {intl, screening} = props;
        const {id} = screening || {};
        const title = intl.formatMessage(DefaultI18nEn.createUpdateSomething, {isUpdate: (id && id !== ''), title: 'Screenings'})
        return {
            modalTitle: title
        }
    }),
    withDrawer
);
export const ScreeningManager = enhance(Manager);

const prepareScreeningInput = values => {
    const {cohorts, attachments=[], ...otherProps} = values;

    const newAttachments = prepareTaskAttachmentInput(attachments);
    return {...otherProps, cohortIds:cohorts.map(({id}) => id), attachments:newAttachments};
}