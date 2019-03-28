import Delete from '../components/Delete';
import {message} from 'antd';
import { withDeleteChemotherapyMutation } from '../../../mutations';
import {compose, withHandlers} from 'recompose';
 

const enhance = compose(
	withDeleteChemotherapyMutation,
	withHandlers({
		handleDelete: (props) => () => {
			props.deleteChemotherapy().then(() => {
                message.success('Deleted');
                if (props.refetch) {
                    props.refetch();
                }
            });
		}
	})
);

export const ChemotherapyDeleteButton = enhance(Delete);
export default ChemotherapyDeleteButton;