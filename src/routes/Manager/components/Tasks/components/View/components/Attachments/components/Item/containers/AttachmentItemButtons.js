import AttachmentItemButtonsPure from '../components/ActionButtons';
import { compose, withHandlers } from 'recompose';
import {message} from 'antd';
import { withUpdateAttachmentMutation } from '../../../mutations';


const enhance = compose(
    withUpdateAttachmentMutation,
    withHandlers({
        doApprove: props => () => {
            const hide = message.loading('Approving...')
            props.updateTaskAttachment(true).then(() => {
                hide();
                // open proper items
            });
        },
        doDecline: props => () => {
            const hide = message.loading('Declining...')
            props.updateTaskAttachment(false).then(() => {
                hide();
            });
        }
    })
);
export const AttachmentItemButtons = enhance(AttachmentItemButtonsPure);