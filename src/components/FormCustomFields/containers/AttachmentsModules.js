import AttachmentsModulesPure from '../components/AttachmentsModules';
import { compose, withHandlers } from 'recompose';
import {message} from 'antd';

const enhance = compose(
    withHandlers({
        onChange: props => (newAttachments) => {
            if (props.onChange) {
                props.onChange(newAttachments);
            }
        }
    }),
    withHandlers({
        updateAttachments: (props) => (attachment, index) => {
            if (props.disabled) {
                return true;
            }
            let {value:newAttachments=[]} = props;
            const {id} = attachment || {};

            if (id) {
                const itemExisted = newAttachments.find(a => a.id ===id);
                const itemIndex = newAttachments.findIndex(a => a.id ===id);
                newAttachments[itemIndex] = {...itemExisted, ...attachment};
            } else if (index >= 0) {
                newAttachments[index] = attachment;
            } else {
                newAttachments = [...newAttachments, attachment];
            }
            // console.log(newAttachments, 'newAttachments');
            // 
            props.onChange(newAttachments);
        },
        deleteAttachment: (props) => (attachment, index) => {
            if (props.disabled) {
                return true;
            }
            let {value:newAttachments=[]} = props;
            const {id} = attachment || {};

            if (id) {
                newAttachments = newAttachments.filter(a => a.id !== id);
            } else if (index >= 0) {
                newAttachments = newAttachments.filter((a,i) => i !== index);
            }

            props.onChange(newAttachments);
            message.success('Deleted');
        }
    }),
);
export const AttachmentsModules = enhance(AttachmentsModulesPure);