import DeleteButtonPure from '../components/DeleteButton';
import {message} from 'antd';
import { compose, withHandlers } from 'recompose';
import { withDeleteVisitMutation } from '../../../mutations';

const enhance = compose(
    withDeleteVisitMutation,
    withHandlers({
        handleDelete: props => () => {
            const hide = message.loading('Deleting...');
            props.deleteVisit().then(() => {
                props.onDelete();
                hide();
                message.success('Deleted');
            });
        }
    })
);
export const VisitDeleteButton = enhance(DeleteButtonPure);