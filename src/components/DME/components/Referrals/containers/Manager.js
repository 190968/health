import DmeReferralManagerPure from '../components/Manager';
import {compose, withHandlers, withProps, branch, renderComponent} from 'recompose';
import {Form, message} from 'antd';
import { withDrawer } from '../../../../Modal';
import { prepareTaskAttachmentInput } from '../../../../FormCustomFields/components/AttachmentsModules';
import { withCreateOrUpdateDmeReferral } from '../../../mutations';

const enhance = compose(
    // withProps(props => {
    //     return {dischargePlan: {id:8454}};
    // }),
    withCreateOrUpdateDmeReferral,
    // branch(props => {
    //     const {isActive=false} = props.dischargePlan || {};
    //     return isActive;
    // }, renderComponent(DischargePlanView)),
    Form.create(),
    withProps(props => {
        // const {equipment} = props;
        return {modalTitle: 'DME Referral'/*, modalFooter:false*/};
    }),
    withHandlers({
        onSubmit: props => () => {
            const {form, dmeReferral} = props;
            form.validateFields((err, values) => {
                if (!err) {
                    const input = prepareDmeReferralInput(values);
                    console.log(input);
                    // if we have to create or update
                    if (dmeReferral) {
                        props.updateDmeReferral(input).then(() => {
                            message.success('Done');
                        });
                    } else {
                        props.createDmeReferral(input).then(() => {
                            message.success('Done');
                        });
                    }
                    props.onHide();
                }
            });
        }
    }),
    // withHandlers({
    //     onSaveDraft: props => () => {
    //         props.onSubmit(true);
    //     },
    //     onAssign: props => () => {
    //         props.onSubmit(false);
    //     }
    // }),
    withDrawer
);

export const DmeReferralManager = enhance(DmeReferralManagerPure);

export const prepareDmeReferralInput = values => {
    const {provider,attachments, icd10Codes} = values;
    const {id:providerId} = provider || {}
    return {providerId, icd10Codes: icd10Codes.map(i=>i.id), attachments: prepareTaskAttachmentInput (attachments)};
}