import DeleteButtonPure from '../components/DeleteButton';
import {message} from 'antd';
import { compose, withHandlers } from 'recompose';
import { withDeleteTransitionhMutation } from '../../../mutations';

const enhance = compose(
    withDeleteTransitionhMutation,
    withHandlers({
        handleDelete: props => () => {
            const hide = message.loading('Deleting...');
            props.deleteTransition().then(() => {
                props.onDelete();
                hide();
                message.success('Deleted');
            });
        }
    })
);
export const TransitionDeleteButton = enhance(DeleteButtonPure);