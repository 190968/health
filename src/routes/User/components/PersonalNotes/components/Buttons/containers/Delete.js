import Delete from '../components/Delete';
import {message} from 'antd';
import { withDeletePersonalNoteMutation } from '../../../mutations';
import {compose, withHandlers} from 'recompose';
 

const enhance = compose(
	withDeletePersonalNoteMutation,
	withHandlers({
		handleDelete: (props) => () => {
			props.deletePersonalNote().then(() => {
                message.success('Deleted');
                if (props.refetch) {
                    props.refetch();
                }
            });
		}
	})
);

export const PersonalNoteDeleteButton = enhance(Delete);
export default PersonalNoteDeleteButton;