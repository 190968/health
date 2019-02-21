import TaskAssignWizzardPure from '../components/TaskAssignWizzard';
import {message} from 'antd';
import { compose, branch, withStateHandlers, renderComponent, withProps, withHandlers } from 'recompose';
import { withPatientSelectIfNeededModal } from '../../Autosuggest/containers/PatientSelect';
import { withPatientOrAroundSelect } from '../components/TaskAssignWizzard/containers/SelectPatientOrAround';
import { TaskManagerAttachmentTypeSelect } from '../components/Attachments/containers/SelectType';
import { withDrawer } from '../../Modal';
import { withAssignToPatientMutation } from '../mutations';
import { prepareTaskAttachmentInput } from '../../FormCustomFields/components/AttachmentsModules';




const AttachmentSelect = withProps(props => {
    const { assignObject } = props;
    const { type } = assignObject || {};
    return { type}
})(TaskManagerAttachmentTypeSelect);

const useSelectAttachmentIfNeeded = branch(props => {
    const { assignObject } = props;
    const { id } = assignObject || {};
    return !id
}, renderComponent(AttachmentSelect));

// If we need to select the assign object
const withAssignObjectEnhancer = compose(
    withStateHandlers(props => {
        const {attachments} = props;
        return {attachments}
    }, {
        updateAttachment: props => (attachment) => {
            return {
                attachments:[attachment]
            }
        }
    }),
    branch(props => !props.attachments, renderComponent(AttachmentSelect)),
)


const enhance = compose(
    // 1. check if we have patient
    withPatientSelectIfNeededModal,
    // 2. if we have patient, then select what are we going to assign.
    withAssignObjectEnhancer,//assignObject
    // 3. select if to patient or around patient
    withPatientOrAroundSelect,
    withProps(props => {
        return {modalTitle: 'Assign Preview', modalOkTitle: 'Assign'}
    }),
    withAssignToPatientMutation,
    withHandlers({
        onSubmit: props => () => {
            const {attachments = []} = props;
            const input = prepareTaskAttachmentInput(attachments);
            const hide = message.loading('Assigning...');
            props.assignToPatient(input).then(() => {
                message.success('Assigned');
                props.onHide();
                hide();
                if (props.refetch) {
                    props.refetch();
                }
            });
        }
    }),
    withDrawer
);

export const TaskAssignWizzard = enhance(TaskAssignWizzardPure);


