import OutreachDeleteButtonPure from '../components/DeleteButton';
import {message} from 'antd';
import { compose, withHandlers } from 'recompose';
import { withDeleteOutreachMutation } from '../../../mutations';

const enhance = compose(
    withDeleteOutreachMutation,
    withHandlers({
        handleDelete: props => () => {
            const hide = message.loading('Deleting...');
            props.deleteOutreach().then(() => {
                props.onDelete();
                hide();
                message.success('Deleted');
            });
        }
    })
);
export const OutreachDeleteButton = enhance(OutreachDeleteButtonPure);