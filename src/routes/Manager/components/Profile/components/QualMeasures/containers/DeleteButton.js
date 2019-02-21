import DeleteButtonPure from '../components/DeleteButton';
import {message} from 'antd';
import { compose, withHandlers } from 'recompose';
import { withDeleteQmMutation } from '../mutations';

const enhance = compose(
    withDeleteQmMutation,
    withHandlers({
        handleDelete: props => () => {
            const hide = message.loading('Deleting...');
            props.deleteQM().then(() => {
                props.onDelete();
                hide();
                message.success('Deleted');
            });
        }
    })
);
export const UserQMDeleteButton = enhance(DeleteButtonPure);