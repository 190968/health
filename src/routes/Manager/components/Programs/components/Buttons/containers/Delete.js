import Delete from '../components/Delete';
import {message} from 'antd';
import { withDeleteProgramMutation } from '../../../mutations';
import {compose, withHandlers} from 'recompose';
 

const enhance = compose(
	withDeleteProgramMutation,
	withHandlers({
		handleDelete: (props) => () => {
			props.deleteProgram().then(() => {
                message.success('Deleted');
                if (props.refetch) {
                    props.refetch();
                }
            });
		}
	})
);

export const ProgramDeleteButton = enhance(Delete);
export default ProgramDeleteButton;