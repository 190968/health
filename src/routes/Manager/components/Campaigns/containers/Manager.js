import Manager from '../components/Manager';
import { compose, withProps, withHandlers, branch, renderComponent } from 'recompose';
// import { withDrawer } from '../../../../../components/Modal';
import {CampaignView} from './View';
import { injectIntl } from 'react-intl';
// import DefaultI18nEn from '../../../../../i18n/en';
import { Form, message } from 'antd';
import moment from 'moment';
import { withCreateOrUpdateCampaign } from '../mutations.js';
import { withDrawer } from '../../../../../components/Modal';
import DefaultI18nEn from '../../../../../i18n/en';
import { prepareTaskAttachmentInput } from '../../../../../components/FormCustomFields/components/AttachmentsModules';

const enhance = compose(
    injectIntl,
    withCreateOrUpdateCampaign,
    branch(props => {
        const {campaign} = props;
        const {isExecuted} = campaign || {};
        return isExecuted;
    }, renderComponent(CampaignView)),
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            const { form, campaign } = props;

            form.validateFields((err, values) => {
                if (!err) {
                    const input = prepareCampaignInput(values);
                    // console.log(props);
                    let finish = null;
                    if (campaign) {
                        finish = props.updateCampaign(input)
                    } else {
                        finish = props.createCampaign(input);
                    }
                    finish.then(() => {
                        message.success(props.intl.formatMessage(DefaultI18nEn.saved));
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
        disabledDate: props => (current) => {
            // Can not select days before today and today
            return current && current < moment().startOf('day');
        },
    }),
    withProps(props => {

        const { intl, campaign } = props;
        const { id } = campaign || {};
        const title = intl.formatMessage(DefaultI18nEn.createUpdateSomething, { isUpdate: (id && id !== ''), title: 'Campaign' })
        return {
            modalTitle: title
        }
    }),
    withDrawer
);
export const CampaignManager = enhance(Manager);

const prepareCampaignInput = values => {
    const { cohorts = [], screenings = [], attachments = [], ...otherProps } = values;

    const newAttachments = prepareTaskAttachmentInput(attachments);

    return { ...otherProps,
        cohortIds: cohorts.map(({ id }) => id), 
        screeningsId: screenings.map(({ id }) => id), 
        attachments: newAttachments };
}