import Delete from '../components/Delete';
import {message} from 'antd';
import { withDelete{{pascalCase $moduleName}}Mutation } from '../../../mutations';
import {compose, withHandlers} from 'recompose';
 

const enhance = compose(
	withDelete{{pascalCase $moduleName}}Mutation,
	withHandlers({
		handleDelete: (props) => () => {
			props.delete{{pascalCase $moduleName}}().then(() => {
                message.success('Deleted');
                if (props.refetch) {
                    props.refetch();
                }
            });
		}
	})
);

export const {{pascalCase $moduleName}}DeleteButton = enhance(Delete);
export default {{pascalCase $moduleName}}DeleteButton;