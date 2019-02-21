import TaskManagerAttachmentsPure from '../components/Attachments';
import { compose, withProps, withHandlers, withStateHandlers } from 'recompose';
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
        updateAttachments: (props) => (attachment) => {
            let {value:newAttachments=[]} = props;
            newAttachments = [...newAttachments, attachment];
            props.onChange(newAttachments);
            //message.success('Added');
        },
        deleteAttachment: (props) => (attachment) => {
            let {value:newAttachments=[]} = props;
            newAttachments = newAttachments.filter(newAttachment => newAttachment !== attachment);
            props.onChange(newAttachments);
            message.success('Deleted');
        }
    }),
);
export const TaskManagerAttachments = enhance(TaskManagerAttachmentsPure);