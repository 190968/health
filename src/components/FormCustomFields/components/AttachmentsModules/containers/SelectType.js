import SelectType from '../components/SelectType';
import { compose, withProps, branch, renderComponent, withState, withHandlers } from 'recompose';
import { withDrawer } from '../../../../Modal';
import {TaskManagerAttachmentSelectAp} from './SelectAp';
import {TaskManagerAttachmentSelectChecklist} from './SelectChecklist';
import {TaskManagerAttachmentSelectAssessment} from './SelectAssessment';

const enhance = compose(
    withState('type', 'setType', props => props.type),
    withHandlers({
        addAttachment: props => (value) => {
            const attachment = {type: props.type, object:value};
            // console.log(props, 'propsprops');
            if (props.updateAttachments) {
                props.updateAttachments(attachment);
                props.onHide();
            } else if (props.updateAttachment) {
                props.updateAttachment(attachment);
            }
        }
    }),
    //branch(props => !props.type, renderComponent(SelectType)),
    branch(props => props.type && props.type === 'ap', renderComponent(TaskManagerAttachmentSelectAp)),
    branch(props => props.type && props.type === 'assessment', renderComponent(TaskManagerAttachmentSelectAssessment)),
    branch(props => props.type && props.type === 'chklist', renderComponent(TaskManagerAttachmentSelectChecklist)),
    //branch(props => props.type == 'assessment', renderComponent(SelectAssessment)),
    withProps(props => {
        const {type} = props;
        return {modalTitle: 'Select Type'}
    }),
    withDrawer,
);
export const AttachmentModuleTypeSelect = enhance(SelectType);