import SelectType from '../components/SelectType';
import { compose, withProps, branch, renderComponent, withState, withHandlers } from 'recompose';
import { withDrawer } from '../../../../Modal';
import {TaskManagerAttachmentSelectAp} from './SelectAp';
import {TaskManagerAttachmentSelectChecklist} from './SelectChecklist';
import {TaskManagerAttachmentSelectAssessment} from './SelectAssessment';
import {TaskManagerAttachmentSelectMedication} from './SelectMedication';
import {TaskManagerAttachmentSelectTracker} from './SelectTracker';
import {TaskManagerAttachmentSelectDME} from './SelectDME';


const enhanceWithModal = compose(
    withProps(props => {
        console.log(props, 'ppppproooops');    
        return {modalTitle: 'Select Type'}
    }),
    withDrawer
);
const enhance = compose(
    withProps(props => {
        console.log(props, 'ppppproooops');    
    }),
    // withProps(props => {
    //     console.log('rrrrrrraaaaa');    
    //     const {type} = props;
    //     return {modalTitle: 'Select Type'}
    // }),
    withState('type', 'setType', props => props.type),
    withHandlers({
        addAttachment: props => (value) => {
            const {i} = props;
            let {attachment} = props;
            let {object} = attachment || {};
            attachment = {...attachment, type: props.type, object: {...object, ...value}};
            if (props.updateAttachments) {
                props.updateAttachments(attachment, i);
            } else if (props.updateAttachment) {
                props.updateAttachment(attachment, i);
            }
            if (props.onHide) {
                props.onHide();
            }
        }
    }),
    //branch(props => !props.type, renderComponent(SelectType)),
    branch(props => props.type && (props.type === 'ap' || props.type === 'up'), renderComponent(TaskManagerAttachmentSelectAp)),
    branch(props => props.type && props.type === 'assessment', renderComponent(TaskManagerAttachmentSelectAssessment)),
    branch(props => props.type && props.type === 'chklist', renderComponent(TaskManagerAttachmentSelectChecklist)),
    branch(props => props.type && props.type === 'medication', renderComponent(TaskManagerAttachmentSelectMedication)),
    branch(props => props.type && props.type === 'tracker', renderComponent(TaskManagerAttachmentSelectTracker)),
    branch(props => props.type && props.type === 'dme', renderComponent(TaskManagerAttachmentSelectDME)),
    branch(({asModal=true}) => asModal, enhanceWithModal),
   
);
export const AttachmentModuleTypeSelect = enhance(SelectType);