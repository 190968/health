import List from '../components/List';
import { with{{pascalCase $moduleName}}sQuery } from '../queries';
import {compose} from 'recompose';


const enhance = compose(
    with{{pascalCase $moduleName}}sQuery,
    withTableCursors
)
export const {{pascalCase $moduleName}}sList = enhance(List);
export default {{pascalCase $moduleName}}sList;