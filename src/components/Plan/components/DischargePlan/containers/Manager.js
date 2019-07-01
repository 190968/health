import DischargePlanManagerPure from '../components/Manager';
import {compose, withHandlers, withProps, branch, renderComponent} from 'recompose';
import {Form, message} from 'antd';
import { withDrawer } from '../../../../Modal';
import { withCreateOrUpdateDischargePlan } from '../mutations';
import { prepareTaskAttachmentInput } from '../../../../FormCustomFields/components/AttachmentsModules';
import { DischargePlanView } from './View';

const enhance = compose(
    // withProps(props => {
    //     return {dischargePlan: {id:8454}};
    // }),
    withCreateOrUpdateDischargePlan,
    branch(props => {
        const {isActive=false} = props.dischargePlan || {};
        return isActive;
    }, renderComponent(DischargePlanView)),
    Form.create(),
    withProps(props => {
        // const {equipment} = props;
        return {modalTitle: 'Discharge Plan', modalFooter:false};
    }),
    withHandlers({
        onSubmit: props => (isDraft=false) => {
            const {form, onChange, i, dischargePlan} = props;
            console.log(11111);
            form.validateFields((err, values) => {
                if (!err) {
                    const input = prepareDischargePlanInput(values);
                    // if we have to create or update
                    if (dischargePlan) {
                        props.updateDischargePlan(input, isDraft).then(() => {
                            message.success('Done');
                        });
                    } else {
                        props.createDischargePlan(input, isDraft).then(() => {
                            message.success('Done');
                        });
                    }
                    props.onHide();
                }
            });
        }
    }),
    withHandlers({
        onSaveDraft: props => () => {
            props.onSubmit(true);
        },
        onAssign: props => () => {
            props.onSubmit(false);
        }
    }),
    withDrawer
);

export const DischargePlanManager = enhance(DischargePlanManagerPure);

export const prepareDischargePlanInput = values => {
    const {attachments} = values;

    return {attachments: prepareTaskAttachmentInput(attachments)};
    // const {procedureCode, quantity, modifier, provider} = values || {};
    // const {id:procedureCodeId} = procedureCode || {}; 
    // const {id:providerId} = provider || {}; 
    // return {procedureCodeId, quantity, modifier, providerId};
}