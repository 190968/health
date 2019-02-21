import UpdateStatusButton from '../components/UpdateStatusButton';
import { compose, withHandlers } from 'recompose';
import {message} from 'antd';
import { withUpdateTaskStatusMutation } from '../../../../../mutations';

const enhance = compose(
    withUpdateTaskStatusMutation,
	withHandlers({
		handleUpdate: (props) => () => {
            const { status } = props;
            const hide = message.loading('Updating...');
			 props.updateTaskStatus(status).then(() => {
                hide();
                message.success('Closed');
             });
		}
	})
);
export const TaskUpdateStatusButton = enhance(UpdateStatusButton);
